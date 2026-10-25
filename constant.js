export const KATEGORI_PELAPORAN = [
  { nama: "Jalan & jembatan", ikon: "M4 20L9 4h6l5 16M12 8v2m0 4v2" },
  { nama: "Penerangan jalan", ikon: "M12 3a6 6 0 00-3 11.2V17h6v-2.8A6 6 0 0012 3zM10 21h4" },
  { nama: "Drainase & banjir", ikon: "M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" },
  { nama: "Taman & ruang terbuka", ikon: "M12 21v-8m0 0c-3 0-5-2-5-5 3 0 5 2 5 5zm0 0c3 0 5-2 5-5-3 0-5 2-5 5z" },
  { nama: "Transportasi umum", ikon: "M5 16V7a2 2 0 012-2h10a2 2 0 012 2v9M5 16h14M5 16v3m14-3v3M8 12h8" },
  { nama: "Kesehatan & pendidikan", ikon: "M12 5v14M5 12h14" },
  { nama: "Lainnya", ikon: "M5 12h.01M12 12h.01M19 12h.01" },
];

export const KECAMATAN = [
  "Soreang", "Kutawaringin", "Katapang", "Banjaran", "Pameungpeuk", "Pangalengan", "Ciparay", "Majalaya",
  "Baleendah", "Dayeuhkolot", "Bojongsoang", "Cileunyi", "Cicalengka", "Rancaekek", "Margahayu", "Margaasih",
  "Cangkuang", "Arjasari", "Ciwidey", "Rancabali", "Pasirjambu", "Cimaung", "Kertasari", "Paseh",
  "Ibun", "Solokanjeruk", "Cikancung", "Nagreg", "Cilengkrang", "Cimenyan", "Kamasan",
];

export const MAKS_UPLOAD_FOTO = 4;
export const MAKS_UPLOAD_MB = 5;

export const DATA_PENGADUAN = [
  { id: "PGD-2610-0142", judul: "Lampu jalan padam di Jl. Raya Soreang", kategori: "Penerangan jalan", kecamatan: "Soreang", tanggal: "19 Okt 2026", status: "Diproses", sisaSla: "2 hari lagi" },
  { id: "PGD-2610-0141", judul: "Jalan berlubang dekat Pasar Banjaran", kategori: "Jalan & jembatan", kecamatan: "Banjaran", tanggal: "18 Okt 2026", status: "Diverifikasi", sisaSla: "4 hari lagi" },
  { id: "PGD-2610-0139", judul: "Saluran drainase tersumbat di Jl. Moch. Toha", kategori: "Drainase & banjir", kecamatan: "Dayeuhkolot", tanggal: "17 Okt 2026", status: "Diterima", sisaSla: "5 hari lagi" },
  { id: "PGD-2610-0133", judul: "Taman kota rusak, bangku patah", kategori: "Taman & ruang terbuka", kecamatan: "Cileunyi", tanggal: "12 Okt 2026", status: "Selesai", sisaSla: "Tepat waktu" },
  { id: "PGD-2610-0128", judul: "Halte angkutan umum tidak layak", kategori: "Transportasi umum", kecamatan: "Majalaya", tanggal: "8 Okt 2026", status: "Selesai", sisaSla: "Tepat waktu" },
  { id: "PGD-2610-0117", judul: "Pagar SD Negeri roboh sebagian", kategori: "Kesehatan & pendidikan", kecamatan: "Ciparay", tanggal: "2 Okt 2026", status: "Ditolak", sisaSla: "-" },
]

export const STATUS_PENGADUAN = ["Semua", "Diterima", "Diverifikasi", "Diproses", "Selesai", "Ditolak"];

export const BADGE_CLASS = {
  Diterima: "bg-white/10 text-zinc-300",
  Diverifikasi: "bg-sky-500/15 text-sky-300",
  Diproses: "bg-amber-500/15 text-amber-300",
  Selesai: "bg-emerald-500/15 text-emerald-300",
  Ditolak: "bg-rose-500/15 text-rose-300",
};