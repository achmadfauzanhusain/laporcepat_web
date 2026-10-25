"use client";

import Link from "next/link";
import { useState } from "react";
import { KECAMATAN } from "@/constant";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-white/30 focus:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50";

const labelCls = "mb-2 block text-sm font-medium text-zinc-300";

function Kartu({ judul, deskripsi, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#111113] p-6 sm:p-8">
      <h2 className="text-lg font-semibold">{judul}</h2>
      <p className="mt-1 text-sm text-zinc-500">{deskripsi}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ProfilPage() {
  // Data contoh; ganti dengan data pengguna dari backend
  const [nama, setNama] = useState("Budi Santoso");
  const [hp, setHp] = useState("081234567890");
  const [kec, setKec] = useState("Soreang");
  const [tampil, setTampil] = useState(false);
  const [pesanProfil, setPesanProfil] = useState("");
  const [pesanSandi, setPesanSandi] = useState({ jenis: "", teks: "" });

  const [isMengubah, setIsMengubah] = useState(false);

  const email = "budi.santoso@email.com";
  const NIK = "3204••••••••0001";

  const inisial = nama
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((k) => k[0].toUpperCase())
    .join("");

  const ubahDetail = () => {
    setIsMengubah(!isMengubah);
  };

  function simpanProfil(e) {
    e.preventDefault();
    // TODO: hubungkan ke backend nanti
    setPesanProfil("Perubahan disimpan.");
    setTimeout(() => setPesanProfil(""), 3000);
  }

  function ubahSandi(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("baru") !== f.get("konfirmasi")) {
      setPesanSandi({
        jenis: "galat",
        teks: "Konfirmasi kata sandi tidak sama.",
      });
      return;
    }
    // TODO: hubungkan ke backend nanti
    setPesanSandi({ jenis: "ok", teks: "Kata sandi berhasil diubah." });
    e.currentTarget.reset();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0b] px-6 pb-12 pt-28 text-zinc-100 antialiased">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,140,255,0.15),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-xl font-semibold text-black">
            {inisial || "?"}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-3xl font-semibold tracking-tight sm:text-4xl">
              {nama || "Profil"}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">budi.santoso@email.com</p>
          </div>
        </div>

        {/* static detail view */}
        {!isMengubah && (
          <div className="my-6">
            <Kartu judul={"Detail Pengguna"}>
              <div className="grid grid-cols-[180px_5px_1fr] space-y-2">
                <p>Nama Lengkap </p>
                <span>:</span>
                <p>{nama} </p>

                <p>Email </p>
                <span>: </span>
                <p>{email} </p>

                <p>NIK </p>
                <span>: </span>
                <p>{NIK} </p>

                <p>Nomor Ponsel </p>
                <span>: </span>
                <p>{hp} </p>

                <p>Kecamatan</p>
                <span>: </span>
                <p>{kec}</p>
              </div>
              <div className="mt-10 flex justify-end items-center gap-4">
                <Link
                  href="/login"
                  className="shrink-0 rounded-full border border-rose-500/40 bg-rose-500/80 px-6 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-rose-500/10 hover:text-rose-200"
                >
                  Keluar
                </Link>

                <button
                  onClick={ubahDetail}
                  type="submit"
                  className="rounded-full border border-white bg-white px-7 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-800 hover:text-white"
                >
                  Ubah Detail
                </button>
              </div>
            </Kartu>
          </div>
        )}

        {isMengubah && (
          <div className="mt-10 space-y-6">
            {/* Data diri */}
            <Kartu
              judul="Data diri"
              deskripsi="Perbarui informasi kontak Anda. NIK dan email tidak dapat diubah."
            >
              <form onSubmit={simpanProfil} className="space-y-5">
                <div>
                  <label htmlFor="nama" className={labelCls}>
                    Nama lengkap
                  </label>
                  <input
                    id="nama"
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nik" className={labelCls}>
                      NIK
                    </label>
                    <input
                      id="nik"
                      type="text"
                      disabled
                      value="3204••••••••0001"
                      readOnly
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      disabled
                      value="budi.santoso@email.com"
                      readOnly
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="hp" className={labelCls}>
                      Nomor ponsel
                    </label>
                    <input
                      id="hp"
                      type="tel"
                      required
                      value={hp}
                      onChange={(e) => setHp(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="kecamatan" className={labelCls}>
                      Kecamatan
                    </label>
                    <select
                      id="kecamatan"
                      value={kec}
                      onChange={(e) => setKec(e.target.value)}
                      className={`${inputCls} appearance-none`}
                    >
                      {KECAMATAN.map((k) => (
                        <option key={k} value={k} className="bg-[#111113]">
                          {k}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4">
                  {pesanProfil && (
                    <p role="status" className="text-sm text-emerald-400">
                      {pesanProfil}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                  >
                    Simpan perubahan
                  </button>
                </div>
              </form>
            </Kartu>

            {/* Kata sandi */}
            <Kartu
              judul="Ubah kata sandi"
              deskripsi="Gunakan kata sandi yang kuat dan tidak dipakai di layanan lain."
            >
              <form onSubmit={ubahSandi} className="space-y-5">
                <div>
                  <label htmlFor="lama" className={labelCls}>
                    Kata sandi saat ini
                  </label>
                  <input
                    id="lama"
                    name="lama"
                    type={tampil ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className={inputCls}
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="baru" className={labelCls}>
                      Kata sandi baru
                    </label>
                    <input
                      id="baru"
                      name="baru"
                      type={tampil ? "text" : "password"}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      placeholder="Min. 8 karakter"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="konfirmasi" className={labelCls}>
                      Ulangi kata sandi baru
                    </label>
                    <input
                      id="konfirmasi"
                      name="konfirmasi"
                      type={tampil ? "text" : "password"}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className={inputCls}
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2.5 text-sm text-zinc-400">
                  <input
                    type="checkbox"
                    checked={tampil}
                    onChange={(e) => setTampil(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-white/5 accent-white"
                  />
                  Tampilkan kata sandi
                </label>
                <div className="flex items-center justify-end gap-4">
                  {pesanSandi.teks && (
                    <p
                      role="status"
                      className={`text-sm ${pesanSandi.jenis === "ok" ? "text-emerald-400" : "text-rose-400"}`}
                    >
                      {pesanSandi.teks}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                  >
                    Ubah kata sandi
                  </button>
                </div>
              </form>
            </Kartu>

            <div className="w-full">
              <button
                onClick={ubahDetail}
                type="submit"
                className="w-full rounded-full border border-rose-500/80 bg-rose-500/80 px-7 py-2.5 text-sm font-semibold  text-white transition hover:bg-rose-500/10 hover:text-rose-200"
              >
                Batalkan Perubahan
              </button>
            </div>

            {/* Sesi */}
            <section className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#111113] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="text-lg font-medium">Keluar dari akun</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Anda akan diminta masuk kembali untuk membuat pengaduan.
                </p>
              </div>
              <Link
                href="/login"
                className="shrink-0 rounded-full border border-rose-500/40 px-6 py-2.5 text-center text-sm font-semibold text-rose-300 transition hover:bg-rose-500/10"
              >
                Keluar
              </Link>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
