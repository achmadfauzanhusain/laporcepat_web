import Link from "next/link";

const pengaduanContoh = [
  { id: "PGD-2610-0142", judul: "Lampu jalan padam di Jl. Raya Soreang", lokasi: "Soreang", status: "Diproses" },
  { id: "PGD-2610-0141", judul: "Jalan berlubang dekat Pasar Banjaran", lokasi: "Banjaran", status: "Diverifikasi" },
  { id: "PGD-2610-0139", judul: "Saluran drainase tersumbat", lokasi: "Dayeuhkolot", status: "Diterima" },
  { id: "PGD-2610-0133", judul: "Taman kota rusak, bangku patah", lokasi: "Cileunyi", status: "Selesai" },
  { id: "PGD-2610-0128", judul: "Halte angkutan umum tidak layak", lokasi: "Majalaya", status: "Selesai" }
];
const statusStyle = {
  Diterima: "bg-white/10 text-zinc-300",
  Diverifikasi: "bg-sky-500/15 text-sky-300",
  Diproses: "bg-amber-500/15 text-amber-300",
  Selesai: "bg-emerald-500/15 text-emerald-300"
};
const alur = [
  { no: "01", judul: "Daftar & masuk", isi: "Buat akun dengan NIK dan email. Cukup sekali, lalu semua pengaduan Anda tercatat di satu tempat." },
  { no: "02", judul: "Isi formulir pengaduan", isi: "Pilih kategori fasilitas, tulis keluhan, tandai lokasi, dan unggah foto bukti dari ponsel Anda." },
  { no: "03", judul: "Diverifikasi petugas", isi: "Petugas memeriksa kelengkapan dan kebenaran laporan sebelum diteruskan ke instansi terkait." },
  { no: "04", judul: "Disposisi ke OPD", isi: "Laporan valid dikirim ke perangkat daerah yang berwenang, lengkap dengan batas waktu penyelesaian." },
  { no: "05", judul: "Pantau sampai selesai", isi: "Lihat setiap perubahan status secara real time dan terima tanggapan resmi setelah diselesaikan." }
];
const statistik = [
  { angka: "12.480", label: "Pengaduan diterima" },
  { angka: "91%", label: "Diselesaikan sesuai SLA" },
  { angka: "2,4 hari", label: "Rata-rata waktu respons" },
  { angka: "31", label: "Kecamatan terlayani" }
];
const kategori = [
  { nama: "Jalan & jembatan", isi: "Lubang, retak, jembatan rusak, marka jalan pudar." },
  { nama: "Penerangan jalan", isi: "Lampu padam, tiang miring, kabel menjuntai." },
  { nama: "Drainase & banjir", isi: "Selokan tersumbat, genangan, tanggul rusak." },
  { nama: "Taman & ruang terbuka", isi: "Fasilitas taman, lapangan, dan area publik." },
  { nama: "Transportasi umum", isi: "Halte, terminal, rambu, dan sarana angkutan." },
  { nama: "Kesehatan & pendidikan", isi: "Puskesmas, posyandu, dan sarana sekolah negeri." }
];
const tataKelola = [
  "Setiap laporan memiliki nomor tiket unik",
  "Batas waktu respons & penyelesaian (SLA)",
  "Riwayat status tercatat dan dapat diaudit",
  "Data pelapor dijaga kerahasiaannya"
];
const faq = [
  { q: "Siapa yang dapat membuat pengaduan?", a: "Setiap warga yang telah mendaftar dan masuk ke akun. Pendaftaran gratis dan hanya membutuhkan NIK, email, dan nomor ponsel aktif." },
  { q: "Pengaduan apa saja yang dapat disampaikan?", a: "Pengaduan seputar fasilitas umum di wilayah Kabupaten Bandung, seperti jalan, penerangan, drainase, taman, halte, dan fasilitas layanan publik lainnya." },
  { q: "Berapa lama pengaduan saya ditindaklanjuti?", a: "Setiap kategori memiliki batas waktu respons dan penyelesaian (SLA). Anda dapat memantau sisa waktunya langsung pada halaman detail pengaduan." },
  { q: "Bagaimana saya tahu status pengaduan saya?", a: "Buka menu Pengaduan Saya. Status berubah dari Diterima, Diverifikasi, Diproses, hingga Selesai, lengkap dengan tanggapan petugas." },
  { q: "Apakah identitas saya aman?", a: "Data pribadi hanya digunakan untuk verifikasi dan tidak ditampilkan kepada publik." }
];

function Pill({ children }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-zinc-300">
    {children}
  </span>;
}

function Check() {
  return <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10.5l4 4 8-9" />
  </svg>;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-zinc-100 antialiased selection:bg-white selection:text-black">
      {
        /* HERO */
      }
      <section className="relative overflow-hidden px-6 pb-24 pt-32 text-center sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,140,255,0.18),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-4xl">
          <Pill>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Layanan resmi Pemerintah Kabupaten Bandung
          </Pill>
          <h1 className="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            Laporkan fasilitas umum
            <br />
            <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">yang bermasalah.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Sampaikan pengaduan dalam hitungan menit, pantau prosesnya secara terbuka, dan ketahui kapan masalah diselesaikan.
            Satu pintu untuk seluruh warga Kabupaten Bandung.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/pengaduan/baru" className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
              Buat Pengaduan
            </Link>
            <Link href="/login" className="rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]">
              Masuk ke akun
            </Link>
          </div>
          <p className="mt-5 text-sm text-zinc-500">Gratis · Transparan · Dipantau SLA</p>
        </div>
      </section>

      {
        /* MOCK WINDOW */
      }
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Semua pengaduan.
            <br />
            Satu tempat.
          </h2>
          <p className="mt-4 text-zinc-400">Lihat status laporan Anda sejelas membuka daftar berkas di komputer.</p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#111113] shadow-[0_30px_120px_-20px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="mx-auto text-xs text-zinc-500">Pengaduan Saya</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
            <aside className="hidden border-r border-white/10 p-4 text-sm md:block">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-500">Status</p>
              {["Semua", "Diterima", "Diverifikasi", "Diproses", "Selesai"].map((s, i) => <div key={s} className={`rounded-lg px-3 py-1.5 ${i === 0 ? "bg-white/10 text-white" : "text-zinc-400"}`}>
                {s}
              </div>)}
            </aside>
            <div className="divide-y divide-white/5">
              {pengaduanContoh.map((p) => <div key={p.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0 text-left">
                  <p className="truncate text-sm font-medium text-zinc-100">{p.judul}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {p.id} · Kec. {p.lokasi}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyle[p.status]}`}>{p.status}</span>
              </div>)}
            </div>
          </div>
        </div>
      </section>

      {
        /* ALUR */
      }
      <section id="alur" className="px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">Tidak ada lagi pengaduan yang hilang tanpa kabar.</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">Dari laporan masuk hingga selesai, setiap langkah tercatat dan bisa Anda pantau.</p>
          <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {alur.map((a) => <div key={a.no} className="grid gap-3 py-8 sm:grid-cols-[80px_1fr_1.4fr] sm:items-baseline sm:gap-8">
              <span className="font-mono text-sm text-zinc-500">{a.no}</span>
              <h3 className="text-xl font-medium">{a.judul}</h3>
              <p className="leading-relaxed text-zinc-400">{a.isi}</p>
            </div>)}
          </div>
        </div>
      </section>

      {
        /* STATISTIK */
      }
      <section className="px-6 pb-28">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {statistik.map((s) => <div key={s.label} className="bg-[#0f0f11] p-8">
            <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.angka}</p>
            <p className="mt-2 text-sm text-zinc-500">{s.label}</p>
          </div>)}
        </div>
        <p className="mx-auto mt-3 max-w-5xl text-xs text-zinc-600">*Angka di atas adalah data contoh untuk keperluan tampilan.</p>
      </section>

      {
        /* KATEGORI */
      }
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Untuk setiap fasilitas umum.</h2>
          <p className="mt-4 text-zinc-400">Pilih kategori yang paling sesuai, petugas akan meneruskannya ke instansi yang tepat.</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kategori.map((k) => <Link
              key={k.nama}
              href="/pengaduan/baru"
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              <h3 className="text-lg font-medium">{k.nama}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{k.isi}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm text-zinc-300 transition group-hover:gap-2">
                Laporkan <span aria-hidden>→</span>
              </span>
            </Link>)}
          </div>
        </div>
      </section>

      {
        /* TATA KELOLA */
      }
      <section className="px-6 pb-28">
        <div className="mx-auto grid max-w-5xl gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8 sm:p-14 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Terukur, transparan, dan akuntabel.</h2>
            <p className="mt-4 text-zinc-400">
              Kinerja layanan dipantau dengan standar waktu yang jelas, sehingga setiap pengaduan mendapat perhatian yang layak.
            </p>
          </div>
          <ul className="space-y-4">
            {tataKelola.map((t) => <li key={t} className="flex gap-3 text-zinc-200">
              <Check />
              {t}
            </li>)}
          </ul>
        </div>
      </section>

      {
        /* FAQ */
      }
      <section id="faq" className="px-6 pb-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Pertanyaan umum</h2>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {faq.map((f) => <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-2xl font-light text-zinc-500 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-zinc-400">{f.a}</p>
            </details>)}
          </div>
        </div>
      </section>

      {
        /* CTA */
      }
      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f11] px-6 py-20 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(120,140,255,0.22),transparent_70%)]"
          />
          <div className="relative">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">Ada fasilitas yang rusak?</h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">Laporkan sekarang dan bantu wujudkan Kabupaten Bandung yang lebih nyaman.</p>
            <Link href="/register" className="mt-9 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200">
              Daftar & Buat Pengaduan
            </Link>
          </div>
        </div>
      </section>

      {
      }
      <footer className="border-t border-white/10 px-6 py-14">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-semibold">Pengaduan Kab. Bandung</p>
            <p className="mt-2 max-w-xs text-sm text-zinc-500">Layanan pengaduan fasilitas umum Pemerintah Kabupaten Bandung.</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium">Layanan</p>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/pengaduan/baru" className="hover:text-white">Buat pengaduan</Link></li>
              <li><Link href="/pengaduan" className="hover:text-white">Pengaduan saya</Link></li>
              <li><a href="#alur" className="hover:text-white">Alur layanan</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium">Akun</p>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/login" className="hover:text-white">Masuk</Link></li>
              <li><Link href="/register" className="hover:text-white">Daftar</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium">Informasi</p>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white">Kebijakan privasi</a></li>
              <li><a href="#" className="hover:text-white">Syarat & ketentuan</a></li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-5xl text-xs text-zinc-600">© 2026 Pemerintah Kabupaten Bandung. Hak cipta dilindungi.</p>
      </footer>
    </main>
  )
}