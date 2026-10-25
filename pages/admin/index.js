"use client";
import Link from "next/link";
import { useState } from "react";

const menuAdmin = [
  { label: "Dashboard", href: "/admin" },
  { label: "Manajemen Pengguna", href: "/admin/pengguna" },
];

function TabAdmin({ aktif }) {
  return (
    <nav aria-label="Menu admin" className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1">
      {menuAdmin.map((m) => (
        <Link
          key={m.href}
          href={m.href}
          aria-current={m.href === aktif ? "page" : undefined}
          className={`shrink-0 rounded-full border px-5 py-2 text-sm transition ${
            m.href === aktif ? "border-white bg-white text-black" : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
          }`}
        >
          {m.label}
        </Link>
      ))}
    </nav>
  );
}

const ringkasan = [
  { label: "Total pengaduan", nilai: "12.480", ket: "+8% dari bulan lalu", naik: true },
  { label: "Pengaduan aktif", nilai: "156", ket: "14 melewati SLA", naik: false },
  { label: "Selesai bulan ini", nilai: "412", ket: "+5% dari bulan lalu", naik: true },
  { label: "Pengguna terdaftar", nilai: "8.915", ket: "+231 pengguna baru", naik: true },
];

const periode = {
  "6 bulan": {
    label: ["Mei", "Jun", "Jul", "Agu", "Sep", "Okt"],
    masuk: [310, 342, 365, 398, 421, 456],
    selesai: [276, 305, 331, 366, 389, 412],
  },
  "12 bulan": {
    label: ["Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt"],
    masuk: [210, 232, 248, 261, 283, 297, 310, 342, 365, 398, 421, 456],
    selesai: [188, 205, 222, 240, 259, 270, 276, 305, 331, 366, 389, 412],
  },
};

const perKategori = [
  { nama: "Jalan & jembatan", nilai: 4120 },
  { nama: "Penerangan jalan", nilai: 2860 },
  { nama: "Drainase & banjir", nilai: 2315 },
  { nama: "Taman & ruang terbuka", nilai: 1340 },
  { nama: "Transportasi umum", nilai: 1085 },
  { nama: "Kesehatan & pendidikan", nilai: 760 },
];

const perKecamatan = [
  { nama: "Soreang", nilai: 1180 },
  { nama: "Baleendah", nilai: 1045 },
  { nama: "Dayeuhkolot", nilai: 982 },
  { nama: "Rancaekek", nilai: 910 },
  { nama: "Cileunyi", nilai: 874 },
  { nama: "Banjaran", nilai: 801 },
  { nama: "Majalaya", nilai: 733 },
  { nama: "Ciparay", nilai: 690 },
];

const statusDist = [
  { nama: "Selesai", nilai: 10420, warna: "bg-emerald-400" },
  { nama: "Diproses", nilai: 1240, warna: "bg-amber-400" },
  { nama: "Diverifikasi", nilai: 410, warna: "bg-sky-400" },
  { nama: "Diterima", nilai: 160, warna: "bg-zinc-400" },
  { nama: "Ditolak", nilai: 250, warna: "bg-rose-400" },
];

const aktivitas = [
  { teks: "Petugas Rina memverifikasi PGD-2610-0141", waktu: "10 menit lalu" },
  { teks: "Pengaduan baru PGD-2610-0145 masuk dari Pangalengan", waktu: "32 menit lalu" },
  { teks: "Dinas PUPR menyelesaikan PGD-2610-0133", waktu: "2 jam lalu" },
  { teks: "Pengguna baru mendaftar: Siti Rahma", waktu: "3 jam lalu" },
  { teks: "PGD-2610-0131 melewati batas SLA", waktu: "5 jam lalu" },
];

function Kartu({ judul, deskripsi, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8 ${className}`}>
      <h2 className="text-lg font-medium">{judul}</h2>
      {deskripsi && <p className="mt-1 text-sm text-zinc-500">{deskripsi}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function BatangMendatar({ data }) {
  const maks = Math.max(...data.map((d) => d.nilai));
  return (
    <ul className="space-y-4">
      {data.map((d) => (
        <li key={d.nama}>
          <div className="mb-1.5 flex justify-between text-sm">
            <span className="text-zinc-300">{d.nama}</span>
            <span className="text-zinc-500">{d.nilai.toLocaleString("id-ID")}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-white" style={{ width: `${(d.nilai / maks) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function DashboardAdminPage() {
  const [rentang, setRentang] = useState("6 bulan");
  const t = periode[rentang];
  const maks = Math.max(...t.masuk);
  const totalStatus = statusDist.reduce((a, b) => a + b.nilai, 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0b] px-6 pb-24 pt-28 text-zinc-100 antialiased">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,140,255,0.15),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <TabAdmin aktif="/admin" />

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Dashboard admin</h1>
        <p className="mt-3 text-zinc-400">Ringkasan laporan dan statistik layanan pengaduan Kabupaten Bandung.</p>

        {/* KPI */}
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {ringkasan.map((r) => (
            <div key={r.label} className="bg-[#0f0f11] p-6">
              <p className="text-3xl font-semibold tracking-tight">{r.nilai}</p>
              <p className="mt-1.5 text-sm text-zinc-400">{r.label}</p>
              <p className={`mt-3 text-xs ${r.naik ? "text-emerald-400" : "text-amber-400"}`}>{r.ket}</p>
            </div>
          ))}
        </div>

        {/* Tren */}
        <Kartu judul="Tren pengaduan" deskripsi="Pengaduan masuk dibandingkan yang diselesaikan per bulan." className="mt-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-5 text-xs text-zinc-400">
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-white" />Masuk</span>
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-400" />Selesai</span>
            </div>
            <div className="flex gap-2">
              {Object.keys(periode).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setRentang(k)}
                  className={`rounded-full border px-4 py-1.5 text-xs transition ${
                    rentang === k ? "border-white bg-white text-black" : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
          <div className="flex h-56 items-end gap-2 border-b border-white/10 sm:gap-4">
            {t.label.map((bln, i) => (
              <div key={bln} className="flex h-full flex-1 items-end justify-center gap-1">
                <div
                  className="w-full max-w-[22px] rounded-t-md bg-white"
                  style={{ height: `${(t.masuk[i] / maks) * 100}%` }}
                  role="img"
                  aria-label={`${bln}: ${t.masuk[i]} masuk`}
                />
                <div
                  className="w-full max-w-[22px] rounded-t-md bg-emerald-400"
                  style={{ height: `${(t.selesai[i] / maks) * 100}%` }}
                  role="img"
                  aria-label={`${bln}: ${t.selesai[i]} selesai`}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2 sm:gap-4">
            {t.label.map((bln) => (
              <span key={bln} className="flex-1 text-center text-xs text-zinc-500">{bln}</span>
            ))}
          </div>
        </Kartu>

        {/* Kategori & Kecamatan */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Kartu judul="Pengaduan per kategori" deskripsi="Total sepanjang waktu.">
            <BatangMendatar data={perKategori} />
          </Kartu>
          <Kartu judul="Pengaduan per kecamatan" deskripsi="8 kecamatan dengan pengaduan terbanyak.">
            <BatangMendatar data={perKecamatan} />
          </Kartu>
        </div>

        {/* Status & Aktivitas */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Kartu judul="Distribusi status" deskripsi="Posisi seluruh pengaduan saat ini.">
            <div className="flex h-3 overflow-hidden rounded-full bg-white/10">
              {statusDist.map((s) => (
                <div key={s.nama} className={s.warna} style={{ width: `${(s.nilai / totalStatus) * 100}%` }} title={`${s.nama}: ${s.nilai}`} />
              ))}
            </div>
            <ul className="mt-6 space-y-3">
              {statusDist.map((s) => (
                <li key={s.nama} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-3 text-zinc-300">
                    <span className={`h-2.5 w-2.5 rounded-full ${s.warna}`} />
                    {s.nama}
                  </span>
                  <span className="text-zinc-500">
                    {s.nilai.toLocaleString("id-ID")} · {Math.round((s.nilai / totalStatus) * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </Kartu>

          <Kartu judul="Aktivitas terbaru" deskripsi="Kejadian terakhir di sistem.">
            <ul className="divide-y divide-white/5">
              {aktivitas.map((a) => (
                <li key={a.teks} className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                  <p className="text-sm text-zinc-300">{a.teks}</p>
                  <span className="shrink-0 text-xs text-zinc-600">{a.waktu}</span>
                </li>
              ))}
            </ul>
          </Kartu>
        </div>
        <p className="mt-4 text-xs text-zinc-600">*Data di atas adalah contoh untuk keperluan tampilan.</p>
      </div>
    </div>
  );
}