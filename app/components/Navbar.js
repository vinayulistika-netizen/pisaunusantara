'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const WA_URL =
  'https://wa.me/6282115186138?text=Halo%20PisauNusantara%2C%20saya%20ingin%20bertanya%20tentang%20produk%20Anda'

export default function Navbar({ alwaysDark = false }) {
  const navRef = useRef(null)

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

  return (
    <>
      {/* Pure CSS hamburger toggle — bypasses React event system on iOS Safari */}
      <input type="checkbox" id="nav-toggle" className="nav-toggle-input" />
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
            <div className="nav-menu">
              <a href="/#produk">Produk</a>
              <a href="/#keunggulan">Keunggulan</a>
              <a href="/#tentang">Tentang</a>
              <Link href="/blog">Artikel</Link>
              <a href="/#kontak">Kontak</a>
              <a
                href={WA_URL}
                className="btn btn-wa btn-sm nav-cta-mobile"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Chat WA
              </a>
            </div>
            <label
              htmlFor="nav-toggle"
              className="hamburger"
              aria-label="Buka menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </label>
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
    </>
  )
}
