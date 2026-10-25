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


const kategoriList = ["Jalan & jembatan", "Penerangan jalan", "Drainase & banjir", "Taman & ruang terbuka", "Transportasi umum", "Kesehatan & pendidikan"];
const kecamatanList = ["Soreang", "Banjaran", "Dayeuhkolot", "Cileunyi", "Majalaya", "Ciparay", "Baleendah", "Rancaekek"];
const opdList = ["Dinas PUPR", "Dinas Perhubungan", "Dinas Lingkungan Hidup", "Dinas Kesehatan", "Dinas Pendidikan"];
const statusList = ["Diterima", "Diverifikasi", "Diproses", "Selesai", "Ditolak"];
const pelaporList = ["Budi Santoso", "Siti Rahma", "Agus Salim", "Dewi Lestari", "Rudi Hartono", "Nina Marlina"];
const judulList = [
  "Lampu jalan padam", "Jalan berlubang", "Drainase tersumbat", "Bangku taman rusak", "Halte tidak layak", "Atap puskesmas bocor",
  "Rambu roboh", "Jembatan retak", "Trotoar amblas", "Selokan meluap",
];

// Data dummy deterministik (tanpa Math.random agar aman dari hydration error)
const semua = Array.from({ length: 36 }, (_, i) => {
  const n = 145 - i;
  const hari = 21 - Math.floor(i * 0.7);
  return {
    id: `PGD-2610-${String(n).padStart(4, "0")}`,
    judul: `${judulList[i % judulList.length]} di wilayah ${kecamatanList[(i * 3) % kecamatanList.length]}`,
    kategori: kategoriList[i % kategoriList.length],
    kecamatan: kecamatanList[(i * 3) % kecamatanList.length],
    pelapor: pelaporList[i % pelaporList.length],
    opd: i % 7 === 0 ? "-" : opdList[i % opdList.length],
    tanggal: `${Math.max(1, hari)} Okt 2026`,
    status: statusList[(i * 2 + (i > 6 ? 3 : 0)) % statusList.length],
  };
});

const badge = {
  Diterima: "bg-white/10 text-zinc-300",
  Diverifikasi: "bg-sky-500/15 text-sky-300",
  Diproses: "bg-amber-500/15 text-amber-300",
  Selesai: "bg-emerald-500/15 text-emerald-300",
  Ditolak: "bg-rose-500/15 text-rose-300",
};

const selectCls =
  "rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition focus:border-white/30";
const PER_HALAMAN = 10;

function unduhCsv(baris) {
  const kolom = ["id", "judul", "kategori", "kecamatan", "pelapor", "opd", "tanggal", "status"];
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const isi = [kolom.join(","), ...baris.map((b) => kolom.map((k) => esc(b[k])).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob(["﻿" + isi], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "log-pengaduan.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function LogPengaduanPage() {
  const [cari, setCari] = useState("");
  const [status, setStatus] = useState("Semua status");
  const [kategori, setKategori] = useState("Semua kategori");
  const [kecamatan, setKecamatan] = useState("Semua kecamatan");
  const [halaman, setHalaman] = useState(1);

  const tersaring = useMemo(
    () =>
      semua.filter(
        (d) =>
          (status === "Semua status" || d.status === status) &&
          (kategori === "Semua kategori" || d.kategori === kategori) &&
          (kecamatan === "Semua kecamatan" || d.kecamatan === kecamatan) &&
          (d.id + d.judul + d.pelapor).toLowerCase().includes(cari.toLowerCase())
      ),
    [cari, status, kategori, kecamatan]
  );

  const totalHal = Math.max(1, Math.ceil(tersaring.length / PER_HALAMAN));
  const hal = Math.min(halaman, totalHal);
  const baris = tersaring.slice((hal - 1) * PER_HALAMAN, hal * PER_HALAMAN);

  // Setiap filter berubah, kembali ke halaman 1
  const ubah = (setter) => (e) => {
    setter(e.target.value);
    setHalaman(1);
  };

  const adaFilter = cari || status !== "Semua status" || kategori !== "Semua kategori" || kecamatan !== "Semua kecamatan";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0b] px-6 pb-24 pt-28 text-zinc-100 antialiased">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,140,255,0.15),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <TabPetugas aktif="/petugas/log" />
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Log pengaduan</h1>
          <p className="mt-3 text-zinc-400">Catatan seluruh pengaduan yang pernah masuk, lengkap dengan pencarian dan filter.</p>
        </div>
        <button
          type="button"
          onClick={() => unduhCsv(tersaring)}
          disabled={tersaring.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" />
          </svg>
          Ekspor CSV
        </button>
      </div>

      {/* Filter */}
      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
        <input
          type="search"
          value={cari}
          onChange={ubah(setCari)}
          placeholder="Cari tiket, judul, pelapor..."
          className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/30 lg:w-72"
        />
        <select value={status} onChange={ubah(setStatus)} className={selectCls} aria-label="Filter status">
          {["Semua status", ...statusList].map((s) => <option key={s} className="bg-[#111113]">{s}</option>)}
        </select>
        <select value={kategori} onChange={ubah(setKategori)} className={selectCls} aria-label="Filter kategori">
          {["Semua kategori", ...kategoriList].map((s) => <option key={s} className="bg-[#111113]">{s}</option>)}
        </select>
        <select value={kecamatan} onChange={ubah(setKecamatan)} className={selectCls} aria-label="Filter kecamatan">
          {["Semua kecamatan", ...kecamatanList].map((s) => <option key={s} className="bg-[#111113]">{s}</option>)}
        </select>
        {adaFilter && (
          <button
            type="button"
            onClick={() => { setCari(""); setStatus("Semua status"); setKategori("Semua kategori"); setKecamatan("Semua kecamatan"); setHalaman(1); }}
            className="px-2 text-sm text-zinc-500 transition hover:text-white"
          >
            Reset filter
          </button>
        )}
      </div>

      <p className="mt-5 text-sm text-zinc-500">{tersaring.length} pengaduan ditemukan</p>

      {/* Tabel */}
      <div className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-[#111113]">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-zinc-500">
              <th className="px-6 py-4 font-medium">Tiket</th>
              <th className="px-4 py-4 font-medium">Pengaduan</th>
              <th className="px-4 py-4 font-medium">Pelapor</th>
              <th className="px-4 py-4 font-medium">OPD</th>
              <th className="px-4 py-4 font-medium">Tanggal</th>
              <th className="px-4 py-4 font-medium">Status</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {baris.map((d) => (
              <tr key={d.id} className="transition hover:bg-white/[0.03]">
                <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-zinc-400">{d.id}</td>
                <td className="max-w-xs px-4 py-4">
                  <p className="truncate font-medium text-zinc-100">{d.judul}</p>
                  <p className="mt-1 text-xs text-zinc-500">{d.kategori} · Kec. {d.kecamatan}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-zinc-400">{d.pelapor}</td>
                <td className="whitespace-nowrap px-4 py-4 text-zinc-400">{d.opd}</td>
                <td className="whitespace-nowrap px-4 py-4 text-zinc-400">{d.tanggal}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${badge[d.status]}`}>{d.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/petugas/verifikasi/${d.id}`} className="text-xs text-zinc-500 transition hover:text-white">
                    Lihat →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {baris.length === 0 && (
          <div className="px-6 py-20 text-center">
            <p className="text-lg font-medium">Tidak ada pengaduan ditemukan</p>
            <p className="mt-2 text-sm text-zinc-500">Coba ubah filter atau kata kunci pencarian.</p>
          </div>
        )}
      </div>

      {/* Paginasi */}
      {tersaring.length > 0 && (
        <div className="mt-5 flex items-center justify-between text-sm text-zinc-500">
          <span>Halaman {hal} dari {totalHal}</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setHalaman(hal - 1)}
              disabled={hal <= 1}
              className="rounded-full border border-white/10 px-4 py-2 text-zinc-300 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              onClick={() => setHalaman(hal + 1)}
              disabled={hal >= totalHal}
              className="rounded-full border border-white/10 px-4 py-2 text-zinc-300 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Berikutnya
            </button>
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-zinc-600">*Data di atas adalah contoh untuk keperluan tampilan.</p>
    </div>
      </div>
    </div>
  );
}