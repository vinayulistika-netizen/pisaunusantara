'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const WA_URL =
  'https://wa.me/6282115186138?text=Halo%20PisauNusantara%2C%20saya%20ingin%20bertanya%20tentang%20produk%20Anda'

export default function Navbar({ alwaysDark = false }) {
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    if (alwaysDark) {
      nav.classList.add('scrolled')
    } else {
      const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 60)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [alwaysDark])

  function toggleMenu() {
    const isOpen = menuRef.current?.classList.toggle('open')
    hamburgerRef.current?.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
  }

  function closeMenu() {
    menuRef.current?.classList.remove('open')
    hamburgerRef.current?.setAttribute('aria-expanded', 'false')
  }

  return (
    <nav id="navbar" ref={navRef} role="navigation" aria-label="Menu utama">
      <div className="container">
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="PisauNusantara Beranda">
            <img
              src="/images/logo.webp"
              alt="PisauNusantara"
              className="nav-logo-img"
              width={80}
              height={80}
            />
          </a>
          <div className="nav-menu" ref={menuRef}>
            <a href="/#produk" onClick={closeMenu}>Produk</a>
            <a href="/#keunggulan" onClick={closeMenu}>Keunggulan</a>
            <a href="/#tentang" onClick={closeMenu}>Tentang</a>
            <Link href="/blog" onClick={closeMenu}>Artikel</Link>
            <a href="/#kontak" onClick={closeMenu}>Kontak</a>
            <a
              href={WA_URL}
              className="btn btn-wa btn-sm nav-cta-mobile"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              💬 Chat WA
            </a>
          </div>
          <button
            className="hamburger"
            ref={hamburgerRef}
            onClick={toggleMenu}
            aria-label="Buka menu"
            aria-expanded="false"
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <a
            href={WA_URL}
            className="btn btn-primary btn-sm nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pesan Sekarang
          </a>
        </div>
      </div>
    </nav>
  )
}
