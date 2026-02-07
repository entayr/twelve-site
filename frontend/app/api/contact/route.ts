// /Users/entayr/twelve-local/frontend/app/api/contact/route.ts
import nodemailer from "nodemailer";

type Json = Record<string, any>;

function now() {
  return new Date().toISOString();
}

function mask(v?: string | null) {
  if (!v) return "";
  if (v.length <= 6) return "***";
  return v.slice(0, 2) + "****" + v.slice(-2);
}

async function readJsonSafe(req: Request): Promise<Json | null> {
  try {
    return (await req.json()) as Json;
  } catch {
    return null;
  }
}

async function verifyTurnstile(params: {
  secret: string;
  token: string;
  remoteip?: string;
}) {
  const body = new URLSearchParams();
  body.set("secret", params.secret);
  body.set("response", params.token);
  if (params.remoteip) body.set("remoteip", params.remoteip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const json = (await res.json()) as {
    success: boolean;
    "error-codes"?: string[];
    challenge_ts?: string;
    hostname?: string;
    action?: string;
    cdata?: string;
  };

  return { ok: res.ok && json?.success === true, raw: json, httpOk: res.ok };
}

function getClientIp(req: Request) {
  // если за nginx/CF — обычно приходит цепочка
  const xf = req.headers.get("x-forwarded-for");
  if (!xf) return undefined;
  return xf.split(",")[0]?.trim() || undefined;
}

function getEnv() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false") === "true";
  const tlsServername = process.env.SMTP_TLS_SERVERNAME || host;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM || user;

  const verify = String(process.env.CONTACT_SMTP_VERIFY || "false") === "true";

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  return {
    host,
    port,
    secure,
    tlsServername,
    user,
    pass,
    to,
    from,
    verify,
    turnstileSecret,
  };
}

export async function POST(req: Request) {
  const t0 = Date.now();

  try {
    const body = await readJsonSafe(req);

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const topic = String(body?.topic || body?.subject || "").trim();
    const message = String(body?.message || "").trim();

    const turnstileToken = String(body?.turnstileToken || "").trim();

    if (!name || !message) {
      return Response.json(
        { ok: false, error: "Заполните имя и сообщение" },
        { status: 400 }
      );
    }

    const env = getEnv();

    // базовая проверка env
    if (!env.host || !env.user || !env.pass || !env.to || !env.from) {
      console.error("[contact]", now(), "ENV_MISSING", {
        host: env.host,
        user: env.user,
        pass: env.pass ? "set" : "missing",
        to: env.to,
        from: env.from,
      });
      return Response.json(
        { ok: false, error: "SMTP env vars are not set" },
        { status: 500 }
      );
    }

    // 1) Turnstile verify (если секрет задан — считаем капчу обязательной)
    if (env.turnstileSecret) {
      if (!turnstileToken) {
        return Response.json(
          { ok: false, error: "Подтвердите, что вы не робот" },
          { status: 400 }
        );
      }

      const remoteip = getClientIp(req);
      const v0 = Date.now();
      const v = await verifyTurnstile({
        secret: env.turnstileSecret,
        token: turnstileToken,
        remoteip,
      });

      console.log("[contact]", now(), "TURNSTILE_VERIFY", {
        ms: Date.now() - v0,
        ok: v.ok,
        httpOk: v.httpOk,
        hostname: v.raw?.hostname,
        errors: v.raw?.["error-codes"] || [],
      });

      if (!v.ok) {
        return Response.json(
          { ok: false, error: "Капча не пройдена. Обновите страницу и попробуйте снова." },
          { status: 400 }
        );
      }
    }

    // 2) SMTP send
    const transporter = nodemailer.createTransport({
      host: env.host,
      port: env.port,
      secure: env.secure, // true для 465, false для 587 STARTTLS
      auth: { user: env.user, pass: env.pass },
      // для 587 обычно STARTTLS:
      requireTLS: !env.secure,
      tls: env.tlsServername ? { servername: env.tlsServername } : undefined,
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 20_000,
    });

    console.log("[contact]", now(), "SMTP_ENV", {
      host: env.host,
      port: env.port,
      secure: env.secure,
      user: env.user,
      pass: mask(env.pass),
      to: env.to,
      from: env.from,
      tlsServername: env.tlsServername,
      verify: env.verify,
    });

    if (env.verify) {
      const v1 = Date.now();
      await transporter.verify();
      console.log("[contact]", now(), "SMTP_VERIFY_OK", { ms: Date.now() - v1 });
    }

    const subject = topic ? `Заявка с сайта: ${topic}` : `Заявка с сайта (без темы)`;

    const text = [
      `Имя: ${name}`,
      email ? `Email: ${email}` : null,
      phone ? `Телефон: ${phone}` : null,
      topic ? `Тема: ${topic}` : null,
      "",
      "Сообщение:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const s0 = Date.now();
    await transporter.sendMail({
      from: env.from,
      to: env.to,
      replyTo: email || undefined,
      subject,
      text,
    });

    console.log("[contact]", now(), "SEND_OK", {
      ms: Date.now() - s0,
      totalMs: Date.now() - t0,
    });

    return Response.json({ ok: true });
  } catch (e: any) {
    console.error("[contact]", now(), "SEND_ERROR", {
      code: e?.code,
      command: e?.command,
      message: e?.message,
      stack: e?.stack,
    });

    const msg =
      e?.message === "Timeout" || e?.code === "ETIMEDOUT"
        ? "Сервер почты не отвечает. Попробуйте позже."
        : e?.message || "Не удалось отправить сообщение";

    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
}