import Link from 'next/link'

export default function Footer() {
  const products = ['Golok', 'Arit', 'Kampak', 'Kujang', 'Pisau Tactical', 'Pisau Survival', 'Pisau Camping', 'Pisau Hiking', 'Pisau Berburu', 'Cangkul', 'Sekop']

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">Pisau<span>Nusantara</span></div>
            <div className="footer-brand-tag">Pengrajin Lokal Bandung Sejak 2016</div>
            <p className="footer-about">Toko perkakas kebun dan pisau outdoor terpercaya di Indonesia sejak 2016. Dibuat pengrajin lokal Bandung dengan baja berkualitas dan kearifan lokal Nusantara.</p>
          </div>
          <div className="footer-col">
            <h4>Menu</h4>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="/#hero">Beranda</a>
              <a href="/#produk">Produk</a>
              <a href="/#tentang">Tentang Kami</a>
              <a href="/#keunggulan">Keunggulan</a>
              <Link href="/blog">Artikel & Tips</Link>
              <a href="/#kontak">Kontak</a>
            </nav>
          </div>
          <div className="footer-col">
            <h4>Produk Kami</h4>
            <ul className="footer-products">
              {products.map((p) => (
                <li key={p}><a href="/#produk">{p}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 PisauNusantara. Made with Love | Jl. Raya Bojongsoang No.85 Bandung-Indonesia</p>
        </div>
      </div>
    </footer>
  )
}
