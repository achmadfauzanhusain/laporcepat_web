"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

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


const opdList = [
  "Dinas Pekerjaan Umum dan Penataan Ruang",
  "Dinas Perhubungan",
  "Dinas Lingkungan Hidup",
  "Dinas Kesehatan",
  "Dinas Pendidikan",
  "Satuan Polisi Pamong Praja",
];

const alasanTolak = [
  "Bukan wewenang Pemerintah Kabupaten Bandung",
  "Informasi tidak lengkap atau tidak jelas",
  "Laporan duplikat",
  "Foto bukti tidak sesuai",
  "Lainnya",
];

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-white/30 focus:bg-white/[0.06]";
const labelCls = "mb-2 block text-sm font-medium text-zinc-300";

const badge = {
  Diterima: "bg-white/10 text-zinc-300",
  Diverifikasi: "bg-sky-500/15 text-sky-300",
  Diproses: "bg-amber-500/15 text-amber-300",
  Selesai: "bg-emerald-500/15 text-emerald-300",
  Ditolak: "bg-rose-500/15 text-rose-300",
};

const titik = {
  Diterima: "bg-zinc-400",
  Diverifikasi: "bg-sky-400",
  Diproses: "bg-amber-400",
  Selesai: "bg-emerald-400",
};

const contoh = {
  judul: "Jalan berlubang dekat Pasar Banjaran",
  kategori: "Jalan & jembatan",
  status: "Diterima",
  masuk: "18 Okt 2026, 07:52",
  kejadian: "15 Okt 2026",
  kecamatan: "Banjaran",
  desa: "Banjaran Wetan",
  alamat: "Jl. Raya Banjaran, 50 m dari gerbang Pasar Banjaran",
  uraian:
    "Terdapat tiga lubang besar di badan jalan dengan kedalaman sekitar 15 cm. Beberapa pengendara motor sudah terjatuh, terutama saat malam atau hujan ketika lubang tertutup genangan.",
  foto: 3,
  pelapor: { nama: "Budi Santoso", hp: "0812-3456-7890", email: "budi.santoso@email.com" },
  sla: { batasHari: 7, terpakai: 3 },
  timeline: [{ status: "Diterima", waktu: "18 Okt 2026, 07:52", catatan: "Laporan masuk ke sistem." }],
};

function Info({ label, children }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-zinc-500">{label}</dt>
      <dd className="mt-1.5 text-sm text-zinc-200">{children}</dd>
    </div>
  );
}

function Kartu({ judul, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8">
      <h2 className="text-lg font-medium">{judul}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function DetailVerifikasiPage() {
  const params = useParams();
  const id = decodeURIComponent(Array.isArray(params?.id) ? params.id[0] : params?.id || "");
  const p = contoh;

  const [keputusan, setKeputusan] = useState("valid");
  const [pesan, setPesan] = useState("");
  const [statusBaru, setStatusBaru] = useState("Diproses");

  function simpanKeputusan(e) {
    e.preventDefault();
    setPesan(keputusan === "valid" ? "Pengaduan diverifikasi dan didisposisikan." : "Pengaduan ditolak dan pelapor diberi tahu.");
    setTimeout(() => setPesan(""), 3500);
  }

  const persenSla = Math.min(100, Math.round((p.sla.terpakai / p.sla.batasHari) * 100));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0b] px-6 pb-24 pt-28 text-zinc-100 antialiased">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,140,255,0.15),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <TabPetugas aktif="/petugas/verifikasi" />
    <div>
      <Link href="/petugas/verifikasi" className="text-sm text-zinc-500 transition hover:text-white">
        ← Antrean verifikasi
      </Link>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="font-mono text-sm text-zinc-500">{id || "PGD-0000-0000"}</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight">{p.judul}</h1>
          <p className="mt-3 text-sm text-zinc-500">
            {p.kategori} · Masuk {p.masuk}
          </p>
        </div>
        <span className={`inline-flex shrink-0 self-start rounded-full px-4 py-1.5 text-sm font-medium ${badge[p.status]}`}>{p.status}</span>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Kiri: data laporan */}
        <div className="space-y-6">
          <Kartu judul="Uraian pengaduan">
            <p className="leading-relaxed text-zinc-400">{p.uraian}</p>
            <dl className="mt-8 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
              <Info label="Tanggal kejadian">{p.kejadian}</Info>
              <Info label="Kecamatan">{p.kecamatan}</Info>
              <Info label="Desa / Kelurahan">{p.desa}</Info>
              <Info label="Alamat">{p.alamat}</Info>
            </dl>
          </Kartu>

          <Kartu judul="Foto bukti">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: p.foto }).map((_, i) => (
                <div key={i} className="flex aspect-[4/3] items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-xs text-zinc-600">
                  Foto {i + 1}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-600">*Placeholder: ganti dengan {"<Image>"} saat data sudah tersedia.</p>
          </Kartu>

          <Kartu judul="Data pelapor">
            <dl className="grid gap-6 sm:grid-cols-3">
              <Info label="Nama">{p.pelapor.nama}</Info>
              <Info label="Ponsel">{p.pelapor.hp}</Info>
              <Info label="Email">{p.pelapor.email}</Info>
            </dl>
          </Kartu>

          <Kartu judul="Riwayat status">
            <ol>
              {[...p.timeline].reverse().map((t, i, arr) => (
                <li key={t.status + t.waktu} className="relative pb-6 pl-7 last:pb-0">
                  {i < arr.length - 1 && <span aria-hidden className="absolute left-[5px] top-3 h-full w-px bg-white/10" />}
                  <span aria-hidden className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full ${titik[t.status]}`} />
                  <p className="text-sm font-medium text-zinc-100">{t.status}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{t.waktu}</p>
                  <p className="mt-2 text-sm text-zinc-400">{t.catatan}</p>
                </li>
              ))}
            </ol>
          </Kartu>
        </div>

        {/* Kanan: tindakan petugas */}
        <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          {/* SLA */}
          <section className="rounded-2xl border border-white/10 bg-[#111113] p-6">
            <h2 className="text-lg font-medium">Batas waktu (SLA)</h2>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div className={`h-full rounded-full ${persenSla >= 80 ? "bg-amber-400" : "bg-white"}`} style={{ width: `${persenSla}%` }} />
            </div>
            <div className="mt-3 flex justify-between text-xs text-zinc-500">
              <span>Hari ke-{p.sla.terpakai}</span>
              <span>Batas {p.sla.batasHari} hari</span>
            </div>
          </section>

          {/* Verifikasi & disposisi */}
          <form onSubmit={simpanKeputusan} className="space-y-5 rounded-2xl border border-white/10 bg-[#111113] p-6">
            <h2 className="text-lg font-medium">Verifikasi & disposisi</h2>

            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Keputusan verifikasi">
              {[
                { v: "valid", t: "Valid" },
                { v: "tolak", t: "Tidak valid" },
              ].map((o) => (
                <button
                  key={o.v}
                  type="button"
                  role="radio"
                  aria-checked={keputusan === o.v}
                  onClick={() => setKeputusan(o.v)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    keputusan === o.v ? "border-white bg-white text-black" : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {o.t}
                </button>
              ))}
            </div>

            {keputusan === "valid" ? (
              <>
                <div>
                  <label htmlFor="opd" className={labelCls}>Disposisi ke OPD</label>
                  <select id="opd" required defaultValue="" className={`${inputCls} appearance-none`}>
                    <option value="" disabled className="bg-[#111113]">Pilih instansi</option>
                    {opdList.map((o) => <option key={o} className="bg-[#111113]">{o}</option>)}
                  </select>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="prioritas" className={labelCls}>Prioritas</label>
                    <select id="prioritas" defaultValue="Normal" className={`${inputCls} appearance-none`}>
                      {["Rendah", "Normal", "Tinggi", "Mendesak"].map((o) => <option key={o} className="bg-[#111113]">{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="batas" className={labelCls}>Batas SLA (hari)</label>
                    <input id="batas" type="number" min={1} max={60} defaultValue={7} className={inputCls} />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="alasan" className={labelCls}>Alasan penolakan</label>
                <select id="alasan" required defaultValue="" className={`${inputCls} appearance-none`}>
                  <option value="" disabled className="bg-[#111113]">Pilih alasan</option>
                  {alasanTolak.map((o) => <option key={o} className="bg-[#111113]">{o}</option>)}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="catatan" className={labelCls}>Catatan untuk pelapor</label>
              <textarea id="catatan" rows={3} required={keputusan === "tolak"} placeholder="Tuliskan tanggapan yang akan diterima pelapor." className={`${inputCls} resize-y`} />
            </div>

            {pesan && <p role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{pesan}</p>}

            <button type="submit" className="w-full rounded-full bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
              {keputusan === "valid" ? "Verifikasi & disposisikan" : "Tolak pengaduan"}
            </button>
          </form>

          {/* Update penyelesaian */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5 rounded-2xl border border-white/10 bg-[#111113] p-6">
            <h2 className="text-lg font-medium">Update penyelesaian</h2>
            <p className="-mt-3 text-sm text-zinc-500">Aktif setelah pengaduan didisposisikan.</p>
            <div>
              <label htmlFor="statusBaru" className={labelCls}>Status</label>
              <select id="statusBaru" value={statusBaru} onChange={(e) => setStatusBaru(e.target.value)} className={`${inputCls} appearance-none`}>
                <option className="bg-[#111113]">Diproses</option>
                <option className="bg-[#111113]">Selesai</option>
              </select>
            </div>
            <div>
              <label htmlFor="progres" className={labelCls}>Catatan progres</label>
              <textarea id="progres" rows={3} placeholder="Contoh: Tim survei lokasi dijadwalkan besok." className={`${inputCls} resize-y`} />
            </div>
            <button type="submit" className="w-full rounded-full border border-white/15 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]">
              Perbarui status
            </button>
          </form>
        </div>
      </div>
      <p className="mt-6 text-xs text-zinc-600">*Data di atas adalah contoh untuk keperluan tampilan.</p>
    </div>
      </div>
    </div>
  );
}