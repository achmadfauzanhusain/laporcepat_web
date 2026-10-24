"use client";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [show, setShow] = useState(false);
    function onSubmit(e) {
        e.preventDefault();
        // TODO: hubungkan ke backend nanti
    }
    return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0b] px-6 py-28 text-zinc-100 antialiased">
        <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,140,255,0.18),transparent_70%)]"
        />
        <div className="relative w-full max-w-md">
            <div className="mb-8 text-center">
                <Link href="/" className="text-sm font-semibold text-zinc-400 transition hover:text-white">
                    Pengaduan Kab. Bandung
                </Link>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight">Selamat datang kembali</h1>
                <p className="mt-3 text-zinc-400">Masuk untuk membuat dan memantau pengaduan Anda.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[#111113] p-7 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.9)]">
                <div>
                    <label htmlFor="identitas" className="mb-2 block text-sm font-medium text-zinc-300">
                        Email atau NIK
                    </label>
                    <input
                        id="identitas"
                        type="text"
                        required
                        autoComplete="username"
                        placeholder="nama@email.com"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-white/30 focus:bg-white/[0.06]"
                    />
                </div>

                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-zinc-300">
                            Kata sandi
                        </label>
                        <a href="#" className="text-xs text-zinc-500 transition hover:text-white">
                            Lupa kata sandi?
                        </a>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type={show ? "text" : "password"}
                            required
                            autoComplete="current-password"
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-16 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-white/30 focus:bg-white/[0.06]"
                        />
                        <button
                            type="button"
                            onClick={() => setShow((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 transition hover:text-white"
                        >
                            {show ? "Sembunyikan" : "Tampilkan"}
                        </button>
                    </div>
                </div>

                <label className="flex items-center gap-2.5 text-sm text-zinc-400">
                    <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-white/5 accent-white" />
                    Ingat saya di perangkat ini
                </label>

                <button type="submit" className="w-full rounded-full bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
                    Masuk
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
                Belum punya akun?{" "}
                <Link href="/register" className="font-medium text-white underline-offset-4 hover:underline">
                    Daftar sekarang
                </Link>
            </p>
        </div>
    </main>;
}