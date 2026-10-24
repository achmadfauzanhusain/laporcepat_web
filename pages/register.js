"use client";
import Link from "next/link";
import { useState } from "react";

const kecamatan = [
    "Soreang",
    "Kutawaringin",
    "Katapang",
    "Banjaran",
    "Pameungpeuk",
    "Pangalengan",
    "Ciparay",
    "Majalaya",
    "Baleendah",
    "Dayeuhkolot",
    "Bojongsoang",
    "Cileunyi",
    "Cicalengka",
    "Rancaekek",
    "Margahayu",
    "Margaasih",
    "Cangkuang",
    "Arjasari",
    "Ciwidey",
    "Rancabali",
    "Pasirjambu",
    "Cimaung",
    "Kertasari",
    "Paseh",
    "Ibun",
    "Solokanjeruk",
    "Cikancung",
    "Nagreg",
    "Cilengkrang",
    "Cimenyan",
    "Kamasan"
];

const inputCls = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-white/30 focus:bg-white/[0.06]";
const labelCls = "mb-2 block text-sm font-medium text-zinc-300";

export default function RegisterPage() {
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
        <div className="relative w-full max-w-xl">
            <div className="mb-8 text-center">
                <Link href="/" className="text-sm font-semibold text-zinc-400 transition hover:text-white">
                    Pengaduan Kab. Bandung
                </Link>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight">Buat akun baru</h1>
                <p className="mt-3 text-zinc-400">Daftar gratis untuk menyampaikan dan memantau pengaduan.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[#111113] p-7 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.9)]">
                <div>
                    <label htmlFor="nama" className={labelCls}>Nama lengkap</label>
                    <input id="nama" type="text" required autoComplete="name" placeholder="Sesuai KTP" className={inputCls} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="nik" className={labelCls}>NIK</label>
                        <input id="nik" type="text" inputMode="numeric" pattern="[0-9]{16}" maxLength={16} required placeholder="16 digit" className={inputCls} />
                    </div>
                    <div>
                        <label htmlFor="hp" className={labelCls}>Nomor ponsel</label>
                        <input id="hp" type="tel" required autoComplete="tel" placeholder="08xxxxxxxxxx" className={inputCls} />
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="email" className={labelCls}>Email</label>
                        <input id="email" type="email" required autoComplete="email" placeholder="nama@email.com" className={inputCls} />
                    </div>
                    <div>
                        <label htmlFor="kecamatan" className={labelCls}>Kecamatan</label>
                        <select id="kecamatan" required defaultValue="" className={`${inputCls} appearance-none`}>
                            <option value="" disabled className="bg-[#111113]">Pilih kecamatan</option>
                            {kecamatan.map((k) => <option key={k} value={k} className="bg-[#111113]">{k}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="password" className={labelCls}>Kata sandi</label>
                        <input id="password" type={show ? "text" : "password"} required minLength={8} autoComplete="new-password" placeholder="Min. 8 karakter" className={inputCls} />
                    </div>
                    <div>
                        <label htmlFor="konfirmasi" className={labelCls}>Ulangi kata sandi</label>
                        <input id="konfirmasi" type={show ? "text" : "password"} required minLength={8} autoComplete="new-password" placeholder="Ketik ulang" className={inputCls} />
                    </div>
                </div>

                <label className="flex items-center gap-2.5 text-sm text-zinc-400">
                    <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-white/5 accent-white" />
                    Tampilkan kata sandi
                </label>

                <label className="flex items-start gap-2.5 text-sm text-zinc-400">
                    <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-white" />
                    <span>
                        Saya menyetujui{" "}
                        <a href="#" className="text-white underline-offset-4 hover:underline">syarat & ketentuan</a> serta{" "}
                        <a href="#" className="text-white underline-offset-4 hover:underline">kebijakan privasi</a>.
                    </span>
                </label>

                <button type="submit" className="w-full rounded-full bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
                    Daftar
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
                Sudah punya akun?{" "}
                <Link href="/login" className="font-medium text-white underline-offset-4 hover:underline">
                    Masuk
                </Link>
            </p>
        </div>
    </main>;
}