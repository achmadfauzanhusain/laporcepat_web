import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {KATEGORI_PELAPORAN, KECAMATAN, MAKS_UPLOAD_FOTO, MAKS_UPLOAD_MB} from '@/constant'

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-white/30 focus:bg-white/[0.06]";
const labelCls = "mb-2 block text-sm font-medium text-zinc-300";

function Bagian({ no, judul, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 font-mono text-xs text-zinc-300">{no}</span>
        <h2 className="text-lg font-medium">{judul}</h2>
      </div>
      {children}
    </section>
  );
}

export default function PengaduanBaruPage() {
  const [pilih, setPilih] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState([]); // { file, url }
  const [errorDetail, setErrorDetail] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const inputFoto = useRef(null);
  const fotoRef = useRef(foto);
  fotoRef.current = foto;

  useEffect(() => () => fotoRef.current.forEach((f) => URL.revokeObjectURL(f.url)), []);

  function tambahFoto(e) {
    setErrorDetail("");
    const baru = [];
    for (const file of Array.from(e.target.files || [])) {
      if (!file.type.startsWith("image/")) { setErrorDetail("Hanya file gambar yang diperbolehkan."); continue; }
      if (file.size > MAKS_UPLOAD_MB * 1024 * 1024) { setErrorDetail(`Ukuran foto maksimal ${MAKS_UPLOAD_MB} MB.`); continue; }
      baru.push({ file, url: URL.createObjectURL(file) });
    }
    const gabung = [...foto, ...baru];
    if (gabung.length > MAKS_UPLOAD_FOTO) {
      setErrorDetail(`Maksimal ${MAKS_UPLOAD_FOTO} foto.`);
      gabung.slice(MAKS_UPLOAD_FOTO).forEach((f) => URL.revokeObjectURL(f.url));
    }
    setFoto(gabung.slice(0, MAKS_UPLOAD_FOTO));
    e.target.value = "";
  }

  function hapusFoto(i) {
    URL.revokeObjectURL(foto[i].url);
    setFoto(foto.filter((_, idx) => idx !== i));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!pilih) { setErrorDetail("Pilih kategori fasilitas terlebih dahulu."); return; }
    // TODO: hubungkan ke backend nanti
    setUploaded(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (uploaded) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0b] px-6 pb-24 pt-28 text-zinc-100 antialiased">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-120 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(52,211,153,0.15),transparent_70%)]"
        />
        <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#111113] p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <svg viewBox="0 0 20 20" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10.5l4 4 8-9" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight">Pengaduan terkirim</h1>
          <p className="mt-3 text-zinc-400">Laporan Anda sudah kami terima dan akan segera diverifikasi oleh petugas.</p>
          <p className="mt-6 inline-block rounded-full border border-white/10 bg-white/4 px-4 py-2 font-mono text-sm text-zinc-300">
            Nomor tiket: PGD-2610-0143
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/pengaduan" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
              Lihat pengaduan saya
            </Link>
            <button
              type="button"
              onClick={() => { setUploaded(false); setPilih(""); setDeskripsi(""); setFoto([]); }}
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/6"
            >
              Buat pengaduan lain
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0b] px-6 pb-24 pt-28 text-zinc-100 antialiased">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-120 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,140,255,0.15),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-3xl">
        <Link href="/pengaduan" className="text-sm text-zinc-500 transition hover:text-white">
          ← Pengaduan saya
        </Link>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Buat pengaduan</h1>
        <p className="mt-3 text-zinc-400">Ceritakan masalahnya sejelas mungkin agar petugas dapat menindaklanjuti dengan cepat.</p>

        <form onSubmit={onSubmit} className="mt-10 space-y-5">
          {/* 1. Kategori */}
          <Bagian no="1" judul="Jenis fasilitas">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {KATEGORI_PELAPORAN.map((k) => {
                const aktif = pilih === k.nama;
                return (
                  <button
                    key={k.nama}
                    type="button"
                    onClick={() => { setPilih(k.nama); setErrorDetail(""); }}
                    aria-pressed={aktif}
                    className={`flex flex-col items-start gap-3 rounded-xl border p-4 text-left text-sm transition ${
                      aktif
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-white/3 text-zinc-300 hover:border-white/25 hover:bg-white/6"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={k.ikon} />
                    </svg>
                    {k.nama}
                  </button>
                );
              })}
            </div>
          </Bagian>

          {/* 2. Detail */}
          <Bagian no="2" judul="Detail pengaduan">
            <div className="space-y-5">
              <div>
                <label htmlFor="judul" className={labelCls}>Judul pengaduan</label>
                <input id="judul" type="text" required maxLength={100} placeholder="Contoh: Lampu jalan padam sejak seminggu" className={inputCls} />
              </div>
              <div>
                <label htmlFor="deskripsi" className={labelCls}>Uraian masalah</label>
                <textarea
                  id="deskripsi"
                  required
                  minLength={20}
                  maxLength={1000}
                  rows={5}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Jelaskan apa yang terjadi, sejak kapan, dan dampaknya bagi warga sekitar."
                  className={`${inputCls} resize-y`}
                />
                <p className="mt-1.5 text-right text-xs text-zinc-600">{deskripsi.length}/1000</p>
              </div>
              <div>
                <label htmlFor="tanggal" className={labelCls}>Tanggal kejadian</label>
                <input id="tanggal" type="date" required className={`${inputCls} scheme-dark sm:w-60`} />
              </div>
            </div>
          </Bagian>

          {/* 3. Lokasi */}
          <Bagian no="3" judul="Lokasi">
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="kecamatan" className={labelCls}>Kecamatan</label>
                  <select id="kecamatan" required defaultValue="" className={`${inputCls} appearance-none`}>
                    <option value="" disabled className="bg-[#111113]">Pilih kecamatan</option>
                    {KECAMATAN.map((k) => <option key={k} value={k} className="bg-[#111113]">{k}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="desa" className={labelCls}>Desa / Kelurahan</label>
                  <input id="desa" type="text" required placeholder="Nama desa" className={inputCls} />
                </div>
              </div>
              <div>
                <label htmlFor="alamat" className={labelCls}>Alamat / patokan lokasi</label>
                <input id="alamat" type="text" required placeholder="Contoh: Depan Pasar Banjaran, Jl. Raya Banjaran" className={inputCls} />
              </div>
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/2 px-6 py-10 text-center">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-6.2 7-11.5a7 7 0 10-14 0C5 14.800 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                <p className="text-sm text-zinc-400">Peta untuk menandai titik lokasi akan tampil di sini.</p>
                <button type="button" className="rounded-full border border-white/15 px-5 py-2 text-sm text-zinc-200 transition hover:bg-white/6">
                  Gunakan lokasi saya
                </button>
              </div>
            </div>
          </Bagian>

          {/* 4. Foto */}
          <Bagian no="4" judul="Foto bukti">
            <input ref={inputFoto} type="file" accept="image/*" multiple className="sr-only" onChange={tambahFoto} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {foto.map((f, i) => (
                <div key={f.url} className="group relative aspect-square overflow-hidden rounded-xl border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.url} alt={`Foto bukti ${i + 1}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    aria-label={`Hapus foto ${i + 1}`}
                    onClick={() => hapusFoto(i)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-black"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </button>
                </div>
              ))}
              {foto.length < MAKS_UPLOAD_FOTO && (
                <button
                  type="button"
                  onClick={() => inputFoto.current?.click()}
                  className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/2 text-zinc-400 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
                >
                  <span className="text-2xl leading-none">+</span>
                  <span className="text-xs">Tambah foto</span>
                </button>
              )}
            </div>
            <p className="mt-3 text-xs text-zinc-600">Maksimal {MAKS_UPLOAD_FOTO} foto, masing-masing hingga {MAKS_UPLOAD_MB} MB (JPG, PNG, WEBP).</p>
          </Bagian>

          {/* Pernyataan & kirim */}
          <div className="space-y-5 pt-2">
            <label className="flex items-start gap-2.5 text-sm text-zinc-400">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-white" />
              <span>Saya menyatakan bahwa laporan ini benar dan dapat dipertanggungjawabkan.</span>
            </label>

            {errorDetail && (
              <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                {errorDetail}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link href="/pengaduan" className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/6">
                Batal
              </Link>
              <button type="submit" className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
                Kirim pengaduan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}