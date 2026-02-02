"use client";

import { useState } from "react";

export default function ContactFormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok) {
        setOk(false);
        setError(json?.error || "Не удалось отправить сообщение");
        return;
      }

      setOk(true);
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch {
      setOk(false);
      setError("Не удалось отправить сообщение");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-semibold tracking-tight text-white">Написать нам</h3>
      <p className="mt-1 text-sm text-zinc-300">
        Ответим в рабочее время. Срочно — лучше звоните.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-zinc-300">
            Имя *
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-white placeholder:text-zinc-500 outline-none focus:border-white/20"
              placeholder="Иван"
            />
          </label>

          <label className="text-sm text-zinc-300">
            Email *
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-white placeholder:text-zinc-500 outline-none focus:border-white/20"
              placeholder="ivan@mail.ru"
            />
          </label>

          <label className="text-sm text-zinc-300">
            Телефон
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-white placeholder:text-zinc-500 outline-none focus:border-white/20"
              placeholder="+7…"
            />
          </label>

          <label className="text-sm text-zinc-300">
            Тема
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-white placeholder:text-zinc-500 outline-none focus:border-white/20"
              placeholder="Подбор оборудования"
            />
          </label>
        </div>

        <label className="text-sm text-zinc-300">
          Сообщение *
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-white placeholder:text-zinc-500 outline-none focus:border-white/20"
            placeholder="Опишите задачу: что нужно, количества, сроки, город…"
          />
        </label>

        {ok === false ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error || "Не удалось отправить сообщение"}
          </div>
        ) : null}

        {ok === true ? (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            Сообщение отправлено.
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-500">
            Нажимая “Отправить”, вы соглашаетесь на обработку данных
          </div>

          <button
            disabled={loading}
            className="rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-400 disabled:opacity-60"
          >
            {loading ? "Отправка…" : "Отправить"}
          </button>
        </div>
      </form>
    </div>
  );
}
