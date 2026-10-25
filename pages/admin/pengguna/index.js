"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

const peranList = ["Masyarakat", "Petugas", "Admin"];

const awal = [
  { id: 1, nama: "Budi Santoso", email: "budi.santoso@email.com", peran: "Masyarakat", aktif: true, bergabung: "12 Agu 2026" },
  { id: 2, nama: "Siti Rahma", email: "siti.rahma@email.com", peran: "Masyarakat", aktif: true, bergabung: "20 Okt 2026" },
  { id: 3, nama: "Agus Salim", email: "agus.salim@email.com", peran: "Masyarakat", aktif: false, bergabung: "3 Mei 2026" },
  { id: 4, nama: "Rina Marlina", email: "rina.marlina@bandungkab.go.id", peran: "Petugas", aktif: true, bergabung: "10 Jan 2026" },
  { id: 5, nama: "Dedi Kurniawan", email: "dedi.k@bandungkab.go.id", peran: "Petugas", aktif: true, bergabung: "10 Jan 2026" },
  { id: 6, nama: "Nina Anggraeni", email: "nina.a@bandungkab.go.id", peran: "Petugas", aktif: false, bergabung: "2 Mar 2026" },
  { id: 7, nama: "Hendra Gunawan", email: "hendra.g@bandungkab.go.id", peran: "Admin", aktif: true, bergabung: "5 Jan 2026" },
  { id: 8, nama: "Dewi Lestari", email: "dewi.lestari@email.com", peran: "Masyarakat", aktif: true, bergabung: "28 Sep 2026" },
  { id: 9, nama: "Rudi Hartono", email: "rudi.h@email.com", peran: "Masyarakat", aktif: true, bergabung: "14 Okt 2026" },
];

const badgePeran = {
  Masyarakat: "bg-white/10 text-zinc-300",
  Petugas: "bg-sky-500/15 text-sky-300",
  Admin: "bg-violet-500/15 text-violet-300",
};

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-white/30 focus:bg-white/[0.06]";
const labelCls = "mb-2 block text-sm font-medium text-zinc-300";
const selectCls =
  "rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none transition focus:border-white/30";

function inisial(nama) {
  return nama.split(" ").filter(Boolean).slice(0, 2).map((k) => k[0].toUpperCase()).join("");
}

export default function ManajemenPenggunaPage() {
  const [users, setUsers] = useState(awal);
  const [cari, setCari] = useState("");
  const [peran, setPeran] = useState("Semua peran");
  const [status, setStatus] = useState("Semua status");
  const [modal, setModal] = useState(false);
  const [pesan, setPesan] = useState("");

  // Tutup modal dengan tombol Esc
  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => e.key === "Escape" && setModal(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  function info(teks) {
    setPesan(teks);
    setTimeout(() => setPesan(""), 3000);
  }

  const tampil = useMemo(
    () =>
      users.filter(
        (u) =>
          (peran === "Semua peran" || u.peran === peran) &&
          (status === "Semua status" || (status === "Aktif") === u.aktif) &&
          (u.nama + u.email).toLowerCase().includes(cari.toLowerCase())
      ),
    [users, cari, peran, status]
  );

  const hitung = (p) => users.filter((u) => u.peran === p).length;

  function ubahPeran(id, baru) {
    setUsers((us) => us.map((u) => (u.id === id ? { ...u, peran: baru } : u)));
    // TODO: hubungkan ke backend nanti
  }

  function toggleAktif(u) {
    setUsers((us) => us.map((x) => (x.id === u.id ? { ...x, aktif: !x.aktif } : x)));
    info(`${u.nama} ${u.aktif ? "dinonaktifkan" : "diaktifkan kembali"}.`);
    // TODO: hubungkan ke backend nanti
  }

  function tambah(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const baru = {
      id: Date.now(),
      nama: f.get("nama"),
      email: f.get("email"),
      peran: f.get("peran"),
      aktif: true,
      bergabung: "21 Okt 2026",
    };
    // TODO: hubungkan ke backend nanti
    setUsers((us) => [baru, ...us]);
    setModal(false);
    info(`Pengguna ${baru.nama} ditambahkan.`);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0b] px-6 pb-24 pt-28 text-zinc-100 antialiased">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,140,255,0.15),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <TabAdmin aktif="/admin/pengguna" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Manajemen pengguna</h1>
            <p className="mt-3 text-zinc-400">Kelola akun masyarakat, petugas, dan admin.</p>
          </div>
          <button
            type="button"
            onClick={() => setModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            <span className="text-lg leading-none">+</span> Tambah pengguna
          </button>
        </div>

        {/* Ringkasan */}
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {[{ label: "Total pengguna", nilai: users.length }, ...peranList.map((p) => ({ label: p, nilai: hitung(p) }))].map((r) => (
            <div key={r.label} className="bg-[#0f0f11] p-6">
              <p className="text-3xl font-semibold tracking-tight">{r.nilai}</p>
              <p className="mt-1.5 text-sm text-zinc-500">{r.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
          <input
            type="search"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari nama atau email..."
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/30 lg:w-80"
          />
          <select value={peran} onChange={(e) => setPeran(e.target.value)} className={selectCls} aria-label="Filter peran">
            {["Semua peran", ...peranList].map((p) => <option key={p} className="bg-[#111113]">{p}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls} aria-label="Filter status">
            {["Semua status", "Aktif", "Nonaktif"].map((p) => <option key={p} className="bg-[#111113]">{p}</option>)}
          </select>
        </div>

        {pesan && (
          <p role="status" className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            {pesan}
          </p>
        )}

        {/* Tabel */}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#111113]">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-zinc-500">
                <th className="px-6 py-4 font-medium">Pengguna</th>
                <th className="px-4 py-4 font-medium">Peran</th>
                <th className="px-4 py-4 font-medium">Bergabung</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tampil.map((u) => (
                <tr key={u.id} className="transition hover:bg-white/[0.03]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-zinc-200">
                        {inisial(u.nama)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-zinc-100">{u.nama}</p>
                        <p className="truncate text-xs text-zinc-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={u.peran}
                      onChange={(e) => ubahPeran(u.id, e.target.value)}
                      aria-label={`Peran ${u.nama}`}
                      className={`rounded-full border-0 px-3 py-1 text-xs font-medium outline-none ${badgePeran[u.peran]}`}
                    >
                      {peranList.map((p) => <option key={p} className="bg-[#111113] text-white">{p}</option>)}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-zinc-400">{u.bergabung}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-2 text-xs ${u.aktif ? "text-emerald-300" : "text-zinc-500"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${u.aktif ? "bg-emerald-400" : "bg-zinc-600"}`} />
                      {u.aktif ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleAktif(u)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                        u.aktif
                          ? "border-rose-500/30 text-rose-300 hover:bg-rose-500/10"
                          : "border-white/15 text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      {u.aktif ? "Nonaktifkan" : "Aktifkan"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tampil.length === 0 && (
            <div className="px-6 py-20 text-center">
              <p className="text-lg font-medium">Tidak ada pengguna ditemukan</p>
              <p className="mt-2 text-sm text-zinc-500">Coba ubah filter atau kata kunci pencarian.</p>
            </div>
          )}
        </div>
        <p className="mt-3 text-xs text-zinc-600">*Data di atas adalah contoh untuk keperluan tampilan.</p>
      </div>

      {/* Modal tambah pengguna */}
      {modal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <button type="button" aria-label="Tutup" onClick={() => setModal(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="judul-modal"
            onSubmit={tambah}
            className="relative w-full max-w-md space-y-5 rounded-2xl border border-white/10 bg-[#111113] p-7 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.9)]"
          >
            <div>
              <h2 id="judul-modal" className="text-xl font-semibold">Tambah pengguna</h2>
              <p className="mt-1 text-sm text-zinc-500">Akun baru akan menerima email undangan untuk membuat kata sandi.</p>
            </div>
            <div>
              <label htmlFor="m-nama" className={labelCls}>Nama lengkap</label>
              <input id="m-nama" name="nama" required autoFocus className={inputCls} placeholder="Nama pengguna" />
            </div>
            <div>
              <label htmlFor="m-email" className={labelCls}>Email</label>
              <input id="m-email" name="email" type="email" required className={inputCls} placeholder="nama@email.com" />
            </div>
            <div>
              <label htmlFor="m-peran" className={labelCls}>Peran</label>
              <select id="m-peran" name="peran" defaultValue="Petugas" className={`${inputCls} appearance-none`}>
                {peranList.map((p) => <option key={p} className="bg-[#111113]">{p}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setModal(false)} className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/[0.06]">
                Batal
              </button>
              <button type="submit" className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200">
                Tambahkan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}