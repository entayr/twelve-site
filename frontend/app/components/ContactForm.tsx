"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      topic: String(fd.get("topic") || ""),
      message: String(fd.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus("error");
        setError(json?.error || "Ошибка отправки");
        return;
      }

      setStatus("sent");
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setError("Сеть/сервер недоступны");
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white">Написать нам</h3>
      <p className="mt-1 text-sm text-white/70">
        Ответим в рабочее время. Срочно — лучше звоните.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs text-white/70">Имя *</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-white/25"
              placeholder="Иван"
            />
          </div>

          <div>
            <label className="text-xs text-white/70">Email</label>
            <input
              name="email"
              type="email"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-white/25"
              placeholder="ivan@mail.ru"
            />
          </div>

          <div>
            <label className="text-xs text-white/70">Телефон</label>
            <input
              name="phone"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-white/25"
              placeholder="+7..."
            />
          </div>

          <div>
            <label className="text-xs text-white/70">Тема</label>
            <input
              name="topic"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-white/25"
              placeholder="Подбор оборудования"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-white/70">Сообщение *</label>
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-white/25"
            placeholder="Опишите задачу: что нужно, количества, сроки, город..."
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-white/60">
            {status === "sent" ? (
              <span className="text-emerald-400">Отправлено ✅</span>
            ) : status === "error" ? (
              <span className="text-red-400">{error || "Ошибка"}</span>
            ) : (
              <span>Нажимая “Отправить”, вы соглашаетесь на обработку данных</span>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-400 disabled:opacity-60"
          >
            {status === "sending" ? "Отправка..." : "Отправить"}
          </button>
        </div>
      </form>
    </div>
  );
}