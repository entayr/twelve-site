// /Users/entayr/twelve-local/frontend/app/components/ContactFormSection.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: any) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
      execute: (widgetId?: string) => void;
    };
  }
}

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactFormSection() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  // Turnstile (render only on submit)
  const [tsMounted, setTsMounted] = useState(false); // контролирует "пустой блок": он будет появляться только при submit
  const [tsToken, setTsToken] = useState<string>("");

  const widgetIdRef = useRef<string | null>(null);
  const turnstileElRef = useRef<HTMLDivElement | null>(null);
  const scriptLoadingRef = useRef<Promise<void> | null>(null);

  const tokenPromiseRef = useRef<{
    resolve: (t: string) => void;
    reject: (e: Error) => void;
  } | null>(null);

  const canSubmit = useMemo(() => {
    if (!name.trim() || !message.trim()) return false;
    // если siteKey не задан — не блокируем локальную обкатку
    if (!siteKey) return true;
    // для invisible мы будем получать токен на submit — поэтому не блокируем до submit
    return true;
  }, [name, message, siteKey]);

  // Auto-hide "sent" after 4s
  useEffect(() => {
    if (status !== "sent") return;
    const t = setTimeout(() => setStatus("idle"), 4000);
    return () => clearTimeout(t);
  }, [status]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        if (widgetIdRef.current && window.turnstile?.remove) {
          window.turnstile.remove(widgetIdRef.current);
        }
      } catch {}
      widgetIdRef.current = null;
      tokenPromiseRef.current = null;
    };
  }, []);

  function ensureTurnstileScript(): Promise<void> {
    if (!siteKey) return Promise.resolve();

    if (scriptLoadingRef.current) return scriptLoadingRef.current;

    const scriptId = "cf-turnstile-script";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

    scriptLoadingRef.current = new Promise<void>((resolve, reject) => {
      if (existing) return resolve();

      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Turnstile script load failed"));
      document.head.appendChild(s);
    });

    return scriptLoadingRef.current;
  }

  async function waitTurnstileReady() {
    // ждём появления window.turnstile
    let tries = 0;
    while (!window.turnstile && tries < 200) {
      await new Promise((r) => setTimeout(r, 50));
      tries++;
    }
    if (!window.turnstile) throw new Error("Turnstile not available");
  }

  async function renderTurnstileIfNeeded() {
    if (!siteKey) return;

    // IMPORTANT: монтируем DOM-контейнер только на submit
    if (!tsMounted) {
      setTsMounted(true);
      // даём React смонтировать div ref={turnstileElRef}
      await new Promise((r) => setTimeout(r, 0));
    }

    await ensureTurnstileScript();
    await waitTurnstileReady();

    if (widgetIdRef.current) return;

    const el = turnstileElRef.current;
    if (!el) throw new Error("Turnstile element missing");

    // на всякий случай очищаем
    el.innerHTML = "";

    const id = window.turnstile!.render(el, {
      sitekey: siteKey,
      size: "invisible",
      theme: "dark",
      language: "ru",

      callback: (token: string) => {
        if (tokenPromiseRef.current) {
          tokenPromiseRef.current.resolve(token);
          tokenPromiseRef.current = null;
        }
        setTsToken(token);
      },

      "expired-callback": () => {
        setTsToken("");
      },

      "error-callback": () => {
        if (tokenPromiseRef.current) {
          tokenPromiseRef.current.reject(new Error("Turnstile error"));
          tokenPromiseRef.current = null;
        }
        setTsToken("");
      },
    });

    widgetIdRef.current = id;
  }

  async function getTurnstileToken(): Promise<string> {
    if (!siteKey) return "";

    await renderTurnstileIfNeeded();

    // сброс состояния перед новым execute
    setTsToken("");

    return await new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => {
        tokenPromiseRef.current = null;
        reject(new Error("Turnstile timeout"));
      }, 20000);

      tokenPromiseRef.current = {
        resolve: (t: string) => {
          clearTimeout(timeout);
          resolve(t);
        },
        reject: (e: Error) => {
          clearTimeout(timeout);
          reject(e);
        },
      };

      try {
        window.turnstile!.execute(widgetIdRef.current || undefined);
      } catch {
        clearTimeout(timeout);
        tokenPromiseRef.current = null;
        reject(new Error("Turnstile execute failed"));
      }
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      const token = siteKey ? await getTurnstileToken() : "";

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          topic,
          message,
          turnstileToken: siteKey ? token : undefined,
        }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok) {
        setStatus("error");
        setError(json?.error || "Не удалось отправить сообщение");

        // если ошибка — на всякий случай сбрасываем токен/виджет
        setTsToken("");
        try {
          if (siteKey && window.turnstile?.reset) {
            if (widgetIdRef.current) window.turnstile.reset(widgetIdRef.current);
            else window.turnstile.reset();
          }
        } catch {}

        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setPhone("");
      setTopic("");
      setMessage("");

      // reset captcha after success
      setTsToken("");
      try {
        if (siteKey && window.turnstile?.reset) {
          if (widgetIdRef.current) window.turnstile.reset(widgetIdRef.current);
          else window.turnstile.reset();
        }
      } catch {}
    } catch (err: any) {
      const msg =
        err?.message === "Turnstile timeout"
          ? "Turnstile timeout"
          : err?.message || "Сеть/сервер недоступны";

      setStatus("error");
      setError(msg);

      setTsToken("");
      try {
        if (siteKey && window.turnstile?.reset) {
          if (widgetIdRef.current) window.turnstile.reset(widgetIdRef.current);
          else window.turnstile.reset();
        }
      } catch {}
    }
  }

  const inlineStatus = (() => {
    if (status === "sent") return { text: "Сообщение отправлено.", cls: "text-emerald-300" };
    if (status === "error") return { text: error || "Не удалось отправить.", cls: "text-red-300" };
    if (status === "sending") return { text: "Отправляем…", cls: "text-zinc-300" };
    return null;
  })();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-2xl font-semibold tracking-tight text-white">Связаться с нами</h3>
      <p className="mt-2 text-base text-zinc-300">
        Ответим в рабочее время. Срочно — лучше звоните.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-zinc-200">Имя *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white/25"
              placeholder="Иван"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-200">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white/25"
              placeholder="ivan@mail.ru"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-200">Телефон</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white/25"
              placeholder="+7…"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-200">Тема</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white/25"
              placeholder="Подбор оборудования"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-zinc-200">Сообщение *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={7}
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white/25"
            placeholder="Опишите задачу: что нужно, количества, сроки, город…"
          />
        </div>

        {/* ВАРИАНТ B: капча появляется только при submit (invisible), ниже — тексты + кнопка */}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 space-y-3">
          {/* Turnstile контейнер (пустой UI до submit) */}
          {siteKey && tsMounted ? (
            <div className="inline-flex items-center">
              {/* В invisible режиме тут ничего не должно "торчать" */}
              <div ref={turnstileElRef} className="turnstile-inline" />
            </div>
          ) : null}

          {/* нижняя линия */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-xs leading-relaxed text-zinc-500">
              Нажимая “Отправить”, вы соглашаетесь на обработку персональных данных.{" "}
              <Link
                href="/privacy"
                className="text-zinc-300 underline underline-offset-4 hover:text-white"
              >
                Политика
              </Link>
              .
              {inlineStatus ? (
                <span className={`ml-2 ${inlineStatus.cls}`}>{inlineStatus.text}</span>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={!canSubmit || status === "sending"}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-500
                         px-7 py-3 text-sm font-semibold text-white hover:bg-blue-400
                         disabled:opacity-60 md:shrink-0"
            >
              {status === "sending" ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Отправляем…
                </>
              ) : (
                "Отправить"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}