"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const menuPetugas = [
  { label: "Verifikasi", href: "/petugas/verifikasi" },
  { label: "Log Pengaduan", href: "/petugas/log" },
  { label: "Monitoring SLA", href: "/petugas/sla" },
];

function TabPetugas({ aktif }) {
  return (
    <nav aria-label="Menu petugas" className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1">
      {menuPetugas.map((m) => (
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


const data = [
  { id: "PGD-2610-0145", judul: "Pohon tumbang menutup sebagian jalan", kategori: "Jalan & jembatan", kecamatan: "Pangalengan", masuk: "21 Okt 2026", sisaHari: 7, status: "Diterima" },
  { id: "PGD-2610-0144", judul: "Lampu penerangan taman mati total", kategori: "Penerangan jalan", kecamatan: "Baleendah", masuk: "21 Okt 2026", sisaHari: 7, status: "Diterima" },
  { id: "PGD-2610-0143", judul: "Gorong-gorong amblas di depan sekolah", kategori: "Drainase & banjir", kecamatan: "Rancaekek", masuk: "20 Okt 2026", sisaHari: 6, status: "Diterima" },
  { id: "PGD-2610-0142", judul: "Lampu jalan padam di Jl. Raya Soreang", kategori: "Penerangan jalan", kecamatan: "Soreang", masuk: "19 Okt 2026", sisaHari: 2, status: "Diproses" },
  { id: "PGD-2610-0141", judul: "Jalan berlubang dekat Pasar Banjaran", kategori: "Jalan & jembatan", kecamatan: "Banjaran", masuk: "18 Okt 2026", sisaHari: 1, status: "Diverifikasi" },
  { id: "PGD-2610-0139", judul: "Saluran drainase tersumbat di Jl. Moch. Toha", kategori: "Drainase & banjir", kecamatan: "Dayeuhkolot", masuk: "17 Okt 2026", sisaHari: 0, status: "Diterima" },
  { id: "PGD-2610-0136", judul: "Rambu lalu lintas roboh di pertigaan", kategori: "Transportasi umum", kecamatan: "Cicalengka", masuk: "15 Okt 2026", sisaHari: -1, status: "Diverifikasi" },
  { id: "PGD-2610-0131", judul: "Atap posyandu bocor saat hujan", kategori: "Kesehatan & pendidikan", kecamatan: "Ciwidey", masuk: "13 Okt 2026", sisaHari: -2, status: "Diproses" },
];

const daftarStatus = ["Semua", "Diterima", "Diverifikasi", "Diproses"];
const daftarKategori = ["Semua kategori", ...Array.from(new Set(data.map((d) => d.kategori)))];

const badge = {
  Diterima: "bg-white/10 text-zinc-300",
  Diverifikasi: "bg-sky-500/15 text-sky-300",
  Diproses: "bg-amber-500/15 text-amber-300",
};

function ChipSla({ hari }) {
  if (hari < 0) return <span className="rounded-full bg-rose-500/15 px-2.5 py-1 text-xs font-medium text-rose-300">Terlambat {Math.abs(hari)} hari</span>;
  if (hari <= 1) return <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-300">{hari === 0 ? "Hari ini" : "1 hari lagi"}</span>;
  return <span className="text-xs text-zinc-500">{hari} hari lagi</span>;
}

export default function DashboardVerifikasiPage() {
  const [status, setStatus] = useState("Semua");
  const [kategori, setKategori] = useState("Semua kategori");
  const [cari, setCari] = useState("");

  const hitung = useMemo(() => {
    const h = { Semua: data.length };
    data.forEach((d) => (h[d.status] = (h[d.status] || 0) + 1));
    return h;
  }, []);

  const tampil = data.filter(
    (d) =>
      (status === "Semua" || d.status === status) &&
      (kategori === "Semua kategori" || d.kategori === kategori) &&
      (d.judul + d.id + d.kecamatan).toLowerCase().includes(cari.toLowerCase())
  );

  const ringkasan = [
    { label: "Menunggu verifikasi", nilai: hitung.Diterima || 0 },
    { label: "Sudah diverifikasi", nilai: hitung.Diverifikasi || 0 },
    { label: "Sedang diproses", nilai: hitung.Diproses || 0 },
    { label: "Melewati batas SLA", nilai: data.filter((d) => d.sisaHari < 0).length, sorot: true },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0b] px-6 pb-24 pt-28 text-zinc-100 antialiased">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,140,255,0.15),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <TabPetugas aktif="/petugas/verifikasi" />
    <div>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Dashboard verifikasi</h1>
      <p className="mt-3 text-zinc-400">Antrean pengaduan masuk yang perlu diverifikasi dan didisposisikan.</p>

      {/* Ringkasan */}
      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
        {ringkasan.map((r) => (
          <div key={r.label} className="bg-[#0f0f11] p-6">
            <p className={`text-3xl font-semibold tracking-tight ${r.sorot && r.nilai > 0 ? "text-rose-300" : ""}`}>{r.nilai}</p>
            <p className="mt-1.5 text-sm text-zinc-500">{r.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="mt-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {daftarStatus.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                status === s ? "border-white bg-white text-black" : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
              }`}
            >
              {s}
              <span className={`ml-2 text-xs ${status === s ? "text-black/60" : "text-zinc-600"}`}>{hitung[s] || 0}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white outline-none transition focus:border-white/30"
          >
            {daftarKategori.map((k) => (
              <option key={k} className="bg-[#111113]">{k}</option>
            ))}
          </select>
          <input
            type="search"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari tiket, judul, kecamatan..."
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/30 sm:w-72"
          />
        </div>
      </div>

      {/* Tabel */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#111113]">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-zinc-500">
              <th className="px-6 py-4 font-medium">Pengaduan</th>
              <th className="px-4 py-4 font-medium">Kategori</th>
              <th className="px-4 py-4 font-medium">Masuk</th>
              <th className="px-4 py-4 font-medium">Sisa SLA</th>
              <th className="px-4 py-4 font-medium">Status</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tampil.map((d) => (
              <tr key={d.id} className="transition hover:bg-white/[0.03]">
                <td className="max-w-xs px-6 py-4">
                  <p className="truncate font-medium text-zinc-100">{d.judul}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    <span className="font-mono">{d.id}</span> · Kec. {d.kecamatan}
                  </p>
                </td>
                <td className="px-4 py-4 text-zinc-400">{d.kategori}</td>
                <td className="whitespace-nowrap px-4 py-4 text-zinc-400">{d.masuk}</td>
                <td className="whitespace-nowrap px-4 py-4"><ChipSla hari={d.sisaHari} /></td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${badge[d.status]}`}>{d.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/petugas/verifikasi/${d.id}`}
                    className="inline-block rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-white hover:text-black"
                  >
                    Tinjau
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tampil.length === 0 && (
          <div className="px-6 py-20 text-center">
            <p className="text-lg font-medium">Tidak ada pengaduan ditemukan</p>
            <p className="mt-2 text-sm text-zinc-500">Coba ubah filter atau kata kunci pencarian.</p>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-zinc-600">*Data di atas adalah contoh untuk keperluan tampilan.</p>
    </div>
      </div>
    </div>
  );
}