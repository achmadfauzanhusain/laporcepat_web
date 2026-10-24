"use client";
// Tempel ke: file navbar.js di folder yang sama dengan Layout (import Navbar from './navbar')
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { label: "Beranda", href: "/" },
  { label: "Alur Layanan", href: "/#alur" },
  { label: "Buat Pengaduan", href: "/pengaduan/baru" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-[#0a0a0b]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
          <span className="text-[15px] font-semibold tracking-tight text-white">LAPOR CEPAT</span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Aksi desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition hover:text-white">
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Daftar
          </Link>
        </div>

        {/* Tombol menu mobile */}
        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-white/10 px-6 pb-6 pt-3 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3.5 text-base text-zinc-300 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/15 py-3 text-center text-sm font-semibold text-white"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="rounded-full bg-white py-3 text-center text-sm font-semibold text-black"
            >
              Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}