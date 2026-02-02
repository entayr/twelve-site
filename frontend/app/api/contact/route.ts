import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const topic = String(body?.topic || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !message) {
      return Response.json(
        { ok: false, error: "Заполните имя и сообщение" },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = String(process.env.SMTP_SECURE || "true") === "true";
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM || user;

    if (!host || !user || !pass || !to || !from) {
      return Response.json(
        { ok: false, error: "SMTP env vars are not set" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
host: process.env.SMTP_HOST || "hosting.reg.ru",
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // 587 = STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  requireTLS: true,
  tls: {
    servername: "hosting.reg.ru",
  },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 10_000,
});

    const subject = topic
      ? `Заявка с сайта: ${topic}`
      : `Заявка с сайта (без темы)`;

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

    await transporter.sendMail({
      from,
      to,
      replyTo: email || undefined,
      subject,
      text,
    });

    return Response.json({ ok: true });
} catch (e: any) {
  console.error("CONTACT_SEND_ERROR:", e);
  console.error("CONTACT_SEND_ERROR.message:", e?.message);
  console.error("CONTACT_SEND_ERROR.stack:", e?.stack);

  return Response.json(
    { ok: false, error: e?.message || "Не удалось отправить сообщение" },
    { status: 500 }
  );
}
}