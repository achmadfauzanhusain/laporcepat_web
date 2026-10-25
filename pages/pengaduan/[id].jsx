import Link from "next/link";
import { useParams } from "next/navigation";

import { BADGE_CLASS } from '@/constant';

const dataPengaduan = {
  "PGD-2610-0142": {
    judul: "Lampu jalan padam di Jl. Raya Soreang",
    kategori: "Penerangan jalan",
    status: "Diproses",
    tanggalLapor: "19 Okt 2026, 08:14",
    tanggalKejadian: "12 Okt 2026",
    kecamatan: "Soreang",
    desa: "Pamekaran",
    alamat: "Jl. Raya Soreang, depan Kantor Pos",
    uraian:
      "Sudah sekitar satu minggu lima lampu jalan berturut-turut padam. Kondisi jalan sangat gelap pada malam hari dan membahayakan pengendara serta pejalan kaki, terutama di sekitar penyeberangan.",
    opd: "Dinas Perhubungan",
    sla: { batasHari: 7, terpakai: 5 },
    foto: 3,
    timeline: [
      { status: "Diterima", waktu: "19 Okt 2026, 08:14", catatan: "Laporan Anda diterima sistem dengan nomor tiket PGD-2610-0142." },
      { status: "Diverifikasi", waktu: "19 Okt 2026, 13:40", catatan: "Laporan dinyatakan valid. Lokasi dan foto bukti sesuai." },
      { status: "Diproses", waktu: "20 Okt 2026, 09:05", catatan: "Didisposisikan ke Dinas Perhubungan. Tim teknis dijadwalkan survei lokasi." },
    ],
    tanggapan: {
      petugas: "Petugas Verifikasi",
      waktu: "20 Okt 2026, 09:05",
      isi: "Terima kasih atas laporannya. Laporan telah kami teruskan ke Dinas Perhubungan dan akan ditindaklanjuti dalam waktu 7 hari kerja.",
    },
  },
  "PGD-2610-0133": {
    judul: "Taman kota rusak, bangku patah",
    kategori: "Taman & ruang terbuka",
    status: "Selesai",
    tanggalLapor: "12 Okt 2026, 16:02",
    tanggalKejadian: "10 Okt 2026",
    kecamatan: "Cileunyi",
    desa: "Cileunyi Wetan",
    alamat: "Taman Kota Cileunyi",
    uraian: "Tiga bangku taman patah dan salah satunya berpaku mencuat sehingga berbahaya bagi anak-anak.",
    opd: "Dinas Lingkungan Hidup",
    sla: { batasHari: 7, terpakai: 4 },
    foto: 2,
    timeline: [
      { status: "Diterima", waktu: "12 Okt 2026, 16:02", catatan: "Laporan Anda diterima sistem." },
      { status: "Diverifikasi", waktu: "13 Okt 2026, 10:20", catatan: "Laporan dinyatakan valid." },
      { status: "Diproses", waktu: "13 Okt 2026, 14:00", catatan: "Didisposisikan ke Dinas Lingkungan Hidup." },
      { status: "Selesai", waktu: "16 Okt 2026, 11:30", catatan: "Bangku telah diperbaiki dan diganti. Pekerjaan selesai." },
    ],
    tanggapan: {
      petugas: "Dinas Lingkungan Hidup",
      waktu: "16 Okt 2026, 11:30",
      isi: "Tiga bangku taman sudah diganti dengan yang baru. Terima kasih telah membantu menjaga fasilitas umum.",
    },
  },
};

// Default placeholder kalau ID tidak ada di mock data
const contohDefault = {
  ...dataPengaduan["PGD-2610-0142"],
  judul: "Contoh pengaduan fasilitas umum",
  kategori: "Jalan & jembatan",
  status: "Diverifikasi",
  timeline: dataPengaduan["PGD-2610-0142"].timeline.slice(0, 2),
  tanggapan: null,
};

const urutan = ["Diterima", "Diverifikasi", "Diproses", "Selesai"];


const titik = {
  Diterima: "bg-zinc-400",
  Diverifikasi: "bg-sky-400",
  Diproses: "bg-amber-400",
  Selesai: "bg-emerald-400",
  Ditolak: "bg-rose-400",
};

function Info({ label, children }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-zinc-500">{label}</dt>
      <dd className="mt-1.5 text-sm text-zinc-200">{children}</dd>
    </div>
  );
}

export default function DetailPengaduanPage() {
  const params = useParams();
  const id = decodeURIComponent(Array.isArray(params?.id) ? params.id[0] : params?.id || "");
  const p = dataPengaduan[id] || contohDefault;

  const idxAktif = urutan.indexOf(p.status);
  const persenSla = Math.min(100, Math.round((p.sla.terpakai / p.sla.batasHari) * 100));
  const sisaHari = Math.max(0, p.sla.batasHari - p.sla.terpakai);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0b] px-6 pb-24 pt-28 text-zinc-100 antialiased">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-120 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,140,255,0.15),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-5xl">
        <Link href="/pengaduan" className="text-sm text-zinc-500 transition hover:text-white">
          ← Pengaduan saya
        </Link>

        {/* Header */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-sm text-zinc-500">{id || "PGD-0000-0000"}</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{p.judul}</h1>
            <p className="mt-3 text-sm text-zinc-500">
              {p.kategori} · Dilaporkan {p.tanggalLapor}
            </p>
          </div>
          <span className={`inline-flex shrink-0 self-start rounded-full px-4 py-1.5 text-sm font-medium ${BADGE_CLASS[p.status]}`}>{p.status}</span>
        </div>

        {/* Stepper progres */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8">
          <ol className="grid grid-cols-4 gap-2">
            {urutan.map((s, i) => {
              const lewat = p.status === "Ditolak" ? i === 0 : i <= idxAktif;
              return (
                <li key={s} className="relative text-center">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className={`absolute right-1/2 top-3.5 h-px w-full ${lewat ? "bg-white/60" : "bg-white/10"}`}
                    />
                  )}
                  <span
                    className={`relative mx-auto flex h-7 w-7 items-center justify-center rounded-full border text-xs ${
                      lewat ? "border-white bg-white text-black" : "border-white/15 bg-[#111113] text-zinc-600"
                    }`}
                  >
                    {lewat ? (
                      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 10.5l4 4 8-9" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <p className={`mt-3 text-xs sm:text-sm ${lewat ? "text-zinc-200" : "text-zinc-600"}`}>{s}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Kolom kiri */}
          <div className="space-y-6">
            {/* Uraian */}
            <section className="rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8">
              <h2 className="text-lg font-medium">Uraian pengaduan</h2>
              <p className="mt-4 leading-relaxed text-zinc-400">{p.uraian}</p>
              <dl className="mt-8 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
                <Info label="Tanggal kejadian">{p.tanggalKejadian}</Info>
                <Info label="Kecamatan">{p.kecamatan}</Info>
                <Info label="Desa / Kelurahan">{p.desa}</Info>
                <Info label="Alamat">{p.alamat}</Info>
              </dl>
            </section>

            {/* Foto */}
            <section className="rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8">
              <h2 className="text-lg font-medium">Foto bukti</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Array.from({ length: p.foto }).map((_, i) => (
                  <div
                    key={i}
                    className="flex aspect-4/3 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-white/8 to-white/2 text-xs text-zinc-600"
                  >
                    Foto {i + 1}
                  </div>
                ))}
              </div>
            </section>

            {/* Tanggapan */}
            <section className="rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8">
              <h2 className="text-lg font-medium">Tanggapan petugas</h2>
              {p.tanggapan ? (
                <div className="mt-5 rounded-xl border border-white/10 bg-white/3 p-5">
                  <div className="flex items-center justify-between gap-4 text-xs text-zinc-500">
                    <span className="font-medium text-zinc-300">{p.tanggapan.petugas}</span>
                    <span>{p.tanggapan.waktu}</span>
                  </div>
                  <p className="mt-3 leading-relaxed text-zinc-300">{p.tanggapan.isi}</p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-zinc-500">Belum ada tanggapan. Petugas akan menanggapi setelah verifikasi selesai.</p>
              )}
            </section>
          </div>

          {/* Kolom kanan */}
          <div className="space-y-6">
            {/* SLA */}
            <section className="rounded-2xl border border-white/10 bg-[#111113] p-6">
              <h2 className="text-lg font-medium">Batas waktu (SLA)</h2>
              {p.status === "Selesai" ? (
                <p className="mt-4 text-sm text-emerald-400">Diselesaikan dalam {p.sla.terpakai} dari {p.sla.batasHari} hari.</p>
              ) : (
                <>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${persenSla >= 80 ? "bg-amber-400" : "bg-white"}`}
                      style={{ width: `${persenSla}%` }}
                    />
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-zinc-500">
                    <span>Hari ke-{p.sla.terpakai}</span>
                    <span>Batas {p.sla.batasHari} hari</span>
                  </div>
                  <p className="mt-4 text-sm text-zinc-300">Sisa waktu {sisaHari} hari.</p>
                </>
              )}
              <p className="mt-4 border-t border-white/10 pt-4 text-xs text-zinc-500">
                Instansi penanggung jawab: <span className="text-zinc-300">{p.opd}</span>
              </p>
            </section>

            {/* Timeline */}
            <section className="rounded-2xl border border-white/10 bg-[#111113] p-6">
              <h2 className="text-lg font-medium">Riwayat status</h2>
              <ol className="mt-6">
                {[...p.timeline].reverse().map((t, i, arr) => (
                  <li key={t.status + t.waktu} className="relative pb-7 pl-7 last:pb-0">
                    {i < arr.length - 1 && <span aria-hidden className="absolute left-1.25 top-3 h-full w-px bg-white/10" />}
                    <span aria-hidden className={`absolute left-0 top-1.5 h-2.75 w-2.75 rounded-full ${titik[t.status]}`} />
                    <p className="text-sm font-medium text-zinc-100">{t.status}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">{t.waktu}</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{t.catatan}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}