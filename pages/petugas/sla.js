"use client";

import Link from "next/link";
import Data from "./sla-data.json";

const menuPetugas = [
  { label: "Verifikasi", href: "/petugas/verifikasi" },
  { label: "Log Pengaduan", href: "/petugas/log" },
  { label: "Monitoring SLA", href: "/petugas/sla" },
];

function TabPetugas({ aktif }) {
  return (
    <nav
      aria-label="Menu petugas"
      className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1"
    >
      {menuPetugas.map((m) => (
        <Link
          key={m.href}
          href={m.href}
          aria-current={m.href === aktif ? "page" : undefined}
          className={`shrink-0 rounded-full border px-5 py-2 text-sm transition ${
            m.href === aktif
              ? "border-white bg-white text-black"
              : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
          }`}
        >
          {m.label}
        </Link>
      ))}
    </nav>
  );
}


function warnaPersen(p) {
  if (p >= 90) return "bg-emerald-400";
  if (p >= 80) return "bg-amber-400";
  return "bg-rose-400";
}

export default function MonitoringSlaPage() {
  const maks = 100;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0b] px-6 pb-24 pt-28 text-zinc-100 antialiased">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,140,255,0.15),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <TabPetugas aktif="/petugas/sla" />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Monitoring SLA
          </h1>
          <p className="mt-3 text-zinc-400">
            Statistik kinerja layanan: kecepatan respons, penyelesaian, dan
            kepatuhan batas waktu.
          </p>

          {/* Ringkasan */}
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
            {Data.ringkasan.map((r) => (
              <div key={r.label} className="bg-[#0f0f11] p-6">
                <p className="text-3xl font-semibold tracking-tight">
                  {r.nilai}
                </p>
                <p className="mt-1.5 text-sm text-zinc-400">{r.label}</p>
                <p
                  className={`mt-3 text-xs ${r.naik ? "text-emerald-400" : "text-amber-400"}`}
                >
                  {r.ket}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {/* Tren */}
            <section className="rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8">
              <h2 className="text-lg font-medium">Tren kepatuhan SLA</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Persentase pengaduan selesai tepat waktu, 6 bulan terakhir.
              </p>
              <div className="mt-8 flex h-52 items-end gap-3 border-b border-white/10 sm:gap-5">
                {Data.tren.map((t, i) => (
                  <div
                    key={t.bulan}
                    className="flex h-full flex-1 flex-col justify-end"
                  >
                    <span className="mb-2 text-center text-xs text-zinc-400">
                      {t.nilai}%
                    </span>
                    <div
                      className={`w-full rounded-t-lg ${i === Data.tren.length - 1 ? "bg-white" : "bg-white/25"}`}
                      style={{ height: `${(t.nilai / maks) * 100}%` }}
                      role="img"
                      aria-label={`${t.bulan}: ${t.nilai}%`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-3 sm:gap-5">
                {Data.tren.map((t) => (
                  <span
                    key={t.bulan}
                    className="flex-1 text-center text-xs text-zinc-500"
                  >
                    {t.bulan}
                  </span>
                ))}
              </div>
            </section>

            {/* Aturan SLA */}
            <section className="rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8">
              <h2 className="text-lg font-medium">Standar SLA per kategori</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Batas waktu yang berlaku sejak pengaduan dinyatakan valid.
              </p>
              <table className="mt-6 w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-zinc-500">
                    <th className="py-3 font-medium">Kategori</th>
                    <th className="py-3 font-medium">Respons</th>
                    <th className="py-3 font-medium">Selesai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {Data.slaAturan.map((s) => (
                    <tr key={s.kategori}>
                      <td className="py-3.5 text-zinc-200">{s.kategori}</td>
                      <td className="py-3.5 text-zinc-400">{s.respons}</td>
                      <td className="py-3.5 text-zinc-400">{s.selesai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          {/* Kinerja per OPD */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#111113]">
            <div className="p-6 pb-4 sm:p-8 sm:pb-4">
              <h2 className="text-lg font-medium">Kinerja per OPD</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Dibandingkan dari jumlah pengaduan yang ditangani bulan ini.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-y border-white/10 text-xs uppercase tracking-wider text-zinc-500">
                    <th className="px-6 py-3 font-medium sm:px-8">OPD</th>
                    <th className="px-4 py-3 font-medium">Ditangani</th>
                    <th className="px-4 py-3 font-medium">Rata-rata selesai</th>
                    <th className="w-64 px-6 py-3 font-medium sm:px-8">
                      Tepat waktu
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {Data.perOpd.map((o) => {
                    const persen = Math.round((o.tepat / o.total) * 100);
                    return (
                      <tr key={o.opd}>
                        <td className="px-6 py-4 font-medium text-zinc-100 sm:px-8">
                          {o.opd}
                        </td>
                        <td className="px-4 py-4 text-zinc-400">{o.total}</td>
                        <td className="px-4 py-4 text-zinc-400">
                          {o.rata.toLocaleString("id-ID")} hari
                        </td>
                        <td className="px-6 py-4 sm:px-8">
                          <div className="flex items-center gap-3">
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                              <div
                                className={`h-full rounded-full ${warnaPersen(persen)}`}
                                style={{ width: `${persen}%` }}
                              />
                            </div>
                            <span className="w-10 text-right text-xs text-zinc-300">
                              {persen}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Melewati SLA */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">Melewati batas SLA</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Pengaduan yang perlu segera ditindaklanjuti.
                </p>
              </div>
              <Link
                href="/petugas/log"
                className="shrink-0 text-sm text-zinc-500 transition hover:text-white"
              >
                Lihat semua →
              </Link>
            </div>
            <ul className="mt-5 divide-y divide-white/5">
              {Data.terlambat.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/petugas/verifikasi/${t.id}`}
                    className="flex flex-col gap-2 py-4 transition hover:opacity-80 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-zinc-100">
                        {t.judul}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        <span className="font-mono">{t.id}</span> · {t.opd}
                      </p>
                    </div>
                    <span className="shrink-0 self-start rounded-full bg-rose-500/15 px-3 py-1 text-xs font-medium text-rose-300 sm:self-auto">
                      Terlambat {t.telat} hari
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
