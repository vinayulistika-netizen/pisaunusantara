'use client'

import { useEffect, useState, useRef } from 'react'

const WA_URL = 'https://wa.me/6282115186138?text=Halo%20PisauNusantara%2C%20saya%20ingin%20bertanya%20tentang%20produk%20Anda'

function trackConversion() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', { send_to: 'AW-17124070122/KhJQCML8s6scEOqlsuU_' })
  }
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const hamburgerRef = useRef(null)

  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen(prev => !prev)

  useEffect(() => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar')
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Native touchstart untuk hamburger — bypass React event delegation iOS Safari
    const btn = hamburgerRef.current
    const handleTouch = (e) => {
      e.preventDefault()
      setMenuOpen(p => !p)
    }
    if (btn) btn.addEventListener('touchstart', handleTouch, { passive: false })

    // FAQ Accordion
    document.querySelectorAll('.faq-q').forEach(q => {
      q.addEventListener('click', () => {
        const isOpen = q.classList.contains('open')
        document.querySelectorAll('.faq-q').forEach(oq => {
          oq.classList.remove('open')
          oq.setAttribute('aria-expanded', 'false')
          oq.nextElementSibling.classList.remove('open')
        })
        if (!isOpen) {
          q.classList.add('open')
          q.setAttribute('aria-expanded', 'true')
          q.nextElementSibling.classList.add('open')
        }
      })
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (btn) btn.removeEventListener('touchstart', handleTouch)
    }
  }, [])

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            "@id": "https://pisaunusantara.com/#business",
            "name": "PisauNusantara",
            "description": "Toko perkakas kebun dan pisau outdoor terpercaya di Indonesia sejak 2016.",
            "url": "https://pisaunusantara.com",
            "telephone": "+6282115186138",
            "email": "info@pisaunusantara.com",
            "foundingDate": "2016",
            "image": "https://pisaunusantara.com/og-image.jpg",
            "priceRange": "$$",
            "areaServed": "ID",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jl. Raya Bojongsoang No.85, Kec. Bojongsoang",
              "addressLocality": "Kabupaten Bandung",
              "addressRegion": "Jawa Barat",
              "postalCode": "40288",
              "addressCountry": "ID"
            },
            "openingHoursSpecification": [{
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
              "opens": "08:00", "closes": "17:00"
            }]
          }
        ]
      }) }} />

      {/* Floating WA Button */}
      <a className="wa-float" href={WA_URL} target="_blank" rel="noopener noreferrer"
         aria-label="Chat WhatsApp PisauNusantara" onClick={trackConversion}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Navbar */}
      <nav id="navbar" role="navigation" aria-label="Menu utama">
        <div className="container">
          <div className="nav-inner">
            <a href="#hero" className="nav-logo" aria-label="PisauNusantara Beranda">
              <img src="/images/logo.webp" alt="PisauNusantara — Sahabat Berkebun Pilihan Anda" className="nav-logo-img" width={80} height={80} fetchPriority="high" />
            </a>
            <div className={`nav-menu${menuOpen ? ' open' : ''}`}>
              <a href="#hero" onClick={closeMenu}>Beranda</a>
              <a href="#produk" onClick={closeMenu}>Produk</a>
              <a href="#tentang" onClick={closeMenu}>Tentang Kami</a>
              <a href="#keunggulan" onClick={closeMenu}>Keunggulan</a>
              <a href="#testimoni" onClick={closeMenu}>Testimoni</a>
              <a href="#kontak" onClick={closeMenu}>Kontak</a>
              <a href="/blog" onClick={closeMenu}>Artikel</a>
              <a href={WA_URL} className="btn btn-wa btn-sm nav-cta-mobile" target="_blank" rel="noopener noreferrer" onClick={trackConversion}>💬 Chat WA</a>
            </div>
            <a
              ref={hamburgerRef}
              href="#"
              role="button"
              className={`hamburger${menuOpen ? ' active' : ''}`}
              aria-label="Buka menu"
              aria-expanded={menuOpen ? 'true' : 'false'}
              onClick={(e) => { e.preventDefault(); toggleMenu() }}
            >
              <span></span><span></span><span></span>
            </a>
            <a href={WA_URL} className="btn btn-primary btn-sm nav-cta" target="_blank" rel="noopener noreferrer" onClick={trackConversion}>Hubungi Kami</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" aria-label="Selamat datang di PisauNusantara">
        <div className="container">
          <div className="hero-content">
            <h1>Jual Golok, <span>Pisau Tactical,</span> Kujang &amp; Alat Kebun Berkualitas — Pengrajin Bandung Sejak 2016</h1>
            <p className="hero-sub">Pisau, Golok, Kujang &amp; Alat Kebun Berkualitas Tinggi — Dibuat Pengrajin Lokal Bandung, Pengiriman ke Seluruh Nusantara</p>
            <div className="hero-btns">
              <a href="#produk" className="btn btn-primary">Lihat Produk</a>
              <a href={WA_URL} className="btn btn-outline" target="_blank" rel="noopener noreferrer" onClick={trackConversion}>💬 Hubungi via WhatsApp</a>
            </div>
            <div className="trust-badges">
              <div className="trust-badge">🚚 Pengiriman ke Seluruh Indonesia</div>
              <div className="trust-badge">🛡️ Garansi Kualitas</div>
              <div className="trust-badge">⭐ Ribuan Pelanggan Puas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori Produk */}
      <section id="kategori" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Produk Perkakas &amp; Alat Outdoor Kami</h2>
            <span className="section-line"></span>
            <p>Koleksi lengkap alat kebun, pisau outdoor, dan senjata tradisional berkualitas dari pengrajin lokal terbaik</p>
          </div>
          <div className="cat-grid">
            <div className="cat-card">
              <div className="cat-icon">🪓</div>
              <h3>Alat Kebun &amp; Pertanian</h3>
              <ul className="cat-products">
                <li>Golok</li><li>Arit</li><li>Cangkul</li><li>Sekop</li><li>Kampak</li>
              </ul>
              <a href="#produk" className="btn btn-dark btn-sm">Lihat Detail</a>
            </div>
            <div className="cat-card">
              <div className="cat-icon">🏕️</div>
              <h3>Pisau Outdoor &amp; Survival</h3>
              <ul className="cat-products">
                <li>Pisau Tactical</li><li>Pisau Survival</li><li>Pisau Camping</li>
                <li>Pisau Hiking</li><li>Pisau Berburu</li><li>Pisau Seset Kulit Hewan</li>
              </ul>
              <a href="#produk" className="btn btn-dark btn-sm">Lihat Detail</a>
            </div>
            <div className="cat-card">
              <div className="cat-icon">
                <img src="/images/icon-kujang.webp" alt="ikon kujang koleksi budaya nusantara" className="cat-icon-img" loading="lazy" width={60} height={60} />
              </div>
              <h3>Koleksi Budaya Nusantara</h3>
              <ul className="cat-products">
                <li>Kujang Pamor</li><li>Kujang Baja</li><li>Kris</li>
              </ul>
              <a href="#produk" className="btn btn-dark btn-sm">Lihat Detail</a>
            </div>
          </div>
        </div>
      </section>

      {/* Produk Unggulan */}
      <section id="produk" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Produk Unggulan Kami</h2>
            <span className="section-line"></span>
            <p>Pilihan terbaik dari pengrajin lokal Bandung — baja berkualitas, desain kearifan lokal Nusantara</p>
          </div>
          <div className="product-grid">
            {[
              { img: 'golok-baja-carbon', alt: 'golok baja carbon untuk berkebun dan pertanian — PisauNusantara Bandung', name: 'Golok Baja Carbon', desc: 'Golok baja carbon terbaik untuk berkebun dan pertanian. Pengrajin lokal Bandung, ketajaman presisi, tahan lama untuk kebutuhan harian di ladang.', badge: 'terlaris', waText: 'Golok%20Baja%20Carbon' },
              { img: 'pisau-berburu-professional', alt: 'pisau berburu profesional blade baja carbon untuk hunting Indonesia — PisauNusantara', name: 'Pisau Berburu Professional', desc: 'Pisau berburu profesional blade baja carbon khusus untuk hunting. Dirancang skinning dan persiapan hewan buruan, gagang tahan lembab, genggaman kuat.', badge: 'terlaris', waText: 'Pisau%20Berburu%20Professional' },
              { img: 'kampak-pembelah-kayu', alt: 'kampak pembelah kayu berkualitas untuk outdoor dan kehutanan — PisauNusantara', name: 'Kampak Pembelah Kayu', desc: 'Kampak pembelah kayu berkualitas tinggi untuk outdoor dan kehutanan. Kepala baja tempa, gagang kokoh kuat, efisien untuk pembelahan kayu cepat.', badge: 'terlaris', waText: 'Kampak%20Pembelah%20Kayu' },
              { img: 'kujang-khas-sunda', alt: 'kujang khas sunda authentic handmade — PisauNusantara', name: 'Kujang Khas Sunda', desc: 'Kujang asli Sunda authentic handmade pengrajin Bandung. Warisan budaya Nusantara, baja berkualitas, cocok koleksi dan kostum tradisional Jawa Barat.', badge: 'terlaris', waText: 'Kujang%20Khas%20Sunda' },
              { img: 'pisau-tactical-militer', alt: 'pisau tactical militer grade untuk pertahanan diri dan outdoor Indonesia — PisauNusantara', name: 'Pisau Tactical Militer', desc: 'Pisau tactical militer grade untuk pertahanan diri dan outdoor. Blade baja high carbon, handle anti-slip ergonomis, cocok profesional dan militer Indonesia.', badge: 'terlaris', waText: 'Pisau%20Tactical%20Militer' },
              { img: 'pisau-survival-full-tang', alt: 'pisau survival full tang untuk camping dan hiking outdoor Indonesia — PisauNusantara', name: 'Pisau Survival Full Tang', desc: 'Pisau survival full tang untuk camping dan hiking outdoor Indonesia. Konstruksi full tang, blade tebal, tahan kondisi ekstrem alam liar Nusantara.', badge: 'terlaris', waText: 'Pisau%20Survival%20Full%20Tang' },
              { img: 'pisau-camping-lipat', alt: 'pisau camping lipat ringan untuk petualangan outdoor dan hiking Indonesia — PisauNusantara', name: 'Pisau Camping Lipat', desc: 'Pisau camping lipat ringan untuk petualangan outdoor dan hiking. Mudah dibawa, blade stainless berkualitas, aman untuk pemula camping dan outdoor Indonesia.', badge: 'baru', waText: 'Pisau%20Camping%20Lipat' },
              { img: 'pisau-hiking-ringan', alt: 'pisau hiking ringan untuk trail dan pendakian gunung Indonesia — PisauNusantara', name: 'Pisau Hiking Ringan', desc: 'Pisau hiking ringan untuk trail dan pendakian gunung Indonesia. Desain minimalis, bobot ringan, blade tajam, cocok pendaki gunung pemula maupun profesional.', badge: 'baru', waText: 'Pisau%20Hiking%20Ringan' },
              { img: 'arit-sawah-premium', alt: 'arit sawah premium baja carbon untuk panen dan pertanian — PisauNusantara', name: 'Arit Sawah Premium', desc: 'Arit sawah premium bahan baja carbon pilihan untuk panen dan berkebun. Gagang ergonomis kayu jati, tajam presisi, cocok petani profesional Indonesia.', badge: 'terlaris', waText: 'Arit%20Sawah%20Premium' },
              { img: 'pisau-seset-kulit-hewan', alt: 'pisau seset kulit hewan buruan profesional untuk skinning dan pengolahan daging — PisauNusantara', name: 'Pisau Seset Kulit Hewan', desc: 'Pisau seset kulit hewan buruan profesional untuk persiapan daging. Blade tipis ultra-tajam, ergonomis, mempermudah proses skinning dan pengolahan hasil buruan.', badge: 'limited', waText: 'Pisau%20Seset%20Kulit%20Hewan' },
              { img: 'cangkul-gagang-kayu-jati', alt: 'cangkul gagang kayu jati premium untuk berkebun dan pertanian Indonesia — PisauNusantara', name: 'Cangkul Gagang Kayu Jati', desc: 'Cangkul gagang kayu jati premium untuk berkebun dan pertanian. Baja tempa berkualitas, gagang jati kuat ergonomis, ideal petani dan pecinta kebun Indonesia.', badge: 'terlaris', waText: 'Cangkul%20Gagang%20Kayu%20Jati' },
              { img: 'sekop-mini-kebun', alt: 'sekop mini kebun ringan untuk berkebun urban dan taman rumahan — PisauNusantara', name: 'Sekop Mini Kebun', desc: 'Sekop mini kebun ringan untuk berkebun urban dan taman rumahan. Ukuran kompak praktis, baja berkualitas, cocok penanaman bibit dan perawatan tanaman hias.', badge: 'baru', waText: 'Sekop%20Mini%20Kebun' },
            ].map((p) => (
              <div key={p.img} className="product-card">
                <div className="product-img">
                  <img src={`/images/${p.img}.webp`} alt={p.alt} width={400} height={300} />
                  <span className={`badge badge-${p.badge}`}>{p.badge === 'terlaris' ? 'Terlaris' : p.badge === 'baru' ? 'Baru' : 'Stok Terbatas'}</span>
                </div>
                <div className="product-body">
                  <h3>{p.name}</h3>
                  <p className="product-desc">{p.desc}</p>
                  <a href={`https://wa.me/6282115186138?text=Halo%20PisauNusantara%2C%20saya%20ingin%20tanya%20harga%20${p.waText}`} className="btn btn-wa" target="_blank" rel="noopener noreferrer" onClick={trackConversion}>Tanya Harga via WA</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section id="keunggulan" className="section section-dark">
        <div className="container">
          <div className="section-header">
            <h2 style={{color:'var(--white)'}}>Mengapa Memilih PisauNusantara?</h2>
            <span className="section-line"></span>
            <p style={{color:'rgba(255,255,255,0.65)'}}>Keunggulan yang menjadikan kami pilihan utama ribuan pelanggan di seluruh Indonesia</p>
          </div>
          <div className="features-grid">
            {[
              { icon: '🔩', title: 'Baja Pilihan Berkualitas Tinggi', desc: 'Setiap produk menggunakan baja carbon grade terbaik, diproses teknik tempa tradisional untuk ketajaman dan ketahanan optimal.' },
              { icon: '🏆', title: 'Garansi Kualitas Setiap Produk', desc: 'Kami menjamin kualitas setiap produk yang keluar dari bengkel kami. Cacat produksi? Kami ganti atau perbaiki tanpa syarat.' },
              { icon: '👨‍🔧', title: 'Pengrajin Lokal Berpengalaman', desc: 'Didukung pengrajin Bandung berpengalaman yang mewarisi ilmu tempa turun-temurun lebih dari dua generasi.' },
              { icon: '💰', title: 'Harga Kompetitif & Transparan', desc: 'Harga langsung dari pengrajin tanpa perantara, transparan dan kompetitif. Kualitas premium tidak harus menguras kantong.' },
              { icon: '🚚', title: 'Pengiriman Cepat Seluruh Indonesia', desc: 'Bermitra dengan ekspedisi terpercaya — JNE, J&T, Sicepat — memastikan produk sampai ke 34 provinsi dengan aman.' },
              { icon: '🎨', title: 'Desain Kearifan Lokal Nusantara', desc: 'Setiap produk menggabungkan estetika budaya Nusantara dengan fungsi modern, menjadi kebanggaan tersendiri bagi penggunanya.' },
            ].map((f) => (
              <div key={f.title} className="feature-item">
                <span className="feature-emoji">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang Kami */}
      <section id="tentang" className="section section-alt">
        <div className="container">
          <div className="about-wrap">
            <div className="about-text">
              <h2>Tentang PisauNusantara</h2>
              <span className="section-line" style={{margin:'12px 0 20px'}}></span>
              <p>PisauNusantara adalah toko perkakas kebun dan pisau outdoor Indonesia terpercaya yang berdiri sejak 2016 di Jl. Raya Bojongsoang No.85, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40288.</p>
              <p>Sebagai toko pisau terpercaya Bandung, kami menyediakan berbagai produk mulai dari golok, arit, cangkul, sekop, hingga pisau survival Indonesia berkelas, pisau tactical, pisau camping, dan kujang asli Sunda yang autentik.</p>
              <p>Apa yang membedakan PisauNusantara adalah komitmen kami menggabungkan kearifan lokal Nusantara dengan kebutuhan modern. Pengrajin kami mewarisi ilmu tempa turun-temurun, menghasilkan pisau outdoor Indonesia dan perkakas kebun yang tajam, tahan lama, sekaligus bernilai estetika tinggi.</p>
              <p>Dalam satu dekade, PisauNusantara telah melayani lebih dari 10.000 pelanggan puas di 34 provinsi Indonesia — dari Sabang hingga Merauke.</p>
            </div>
            <div className="about-stats">
              {[
                { badge: 'Sejak', display: '2016', label: 'Tahun Berdiri' },
                { display: '93+', label: 'Produk Tersedia' },
                { display: '10.000+', label: 'Pelanggan Puas' },
                { display: '34+', label: 'Provinsi Terjangkau' },
              ].map((s, i) => (
                <div key={i} className="stat-item">
                  {s.badge && <div className="stat-badge">{s.badge}</div>}
                  <div className="stat-number">{s.display}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pengiriman */}
      <section id="pengiriman" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Kami Melayani Pengiriman ke Seluruh Indonesia</h2>
            <span className="section-line"></span>
            <p>Dari Sabang sampai Merauke, produk PisauNusantara siap dikirimkan ke alamat Anda</p>
          </div>
          <div className="city-grid">
            {['Jakarta','Surabaya','Bandung','Medan','Makassar','Semarang','Yogyakarta','Palembang','Balikpapan','Denpasar','Manado','Pontianak'].map(city => (
              <div key={city} className="city-item">📍 {city}</div>
            ))}
          </div>
          <p className="shipping-note">&quot;Setiap bilah lahir dari tangan yang sama yang telah menempa selama puluhan tahun. Inilah yang membedakan warisan dari sekadar perkakas.&quot;</p>
        </div>
      </section>

      {/* Testimoni */}
      <section id="testimoni" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Apa Kata Pelanggan Kami</h2>
            <span className="section-line"></span>
            <p>Kepuasan pelanggan adalah bukti nyata kualitas produk dan layanan PisauNusantara</p>
          </div>
          <div className="testi-grid">
            {[
              { img: 'avatar-agus-prasetyo', alt: 'Budi Galuh', product: 'Golok Baja Carbon', text: 'Golok Baja Carbon dari PisauNusantara kualitasnya luar biasa! Sudah saya pakai 6 bulan untuk berkebun dan masih tajam seperti baru. Pengiriman ke Bogor juga cepat, hanya 2 hari!', name: 'Budi Galuh', city: 'Bogor, Jawa Barat' },
              { img: 'avatar-erik-santoso', alt: 'Erik Santoso', product: 'Pisau Survival Full Tang', text: 'Saya beli Pisau Survival Full Tang untuk kegiatan hiking di Jawa. Build-nya solid banget, full tang benar-benar kokoh dan bisa diandalkan. Recommended banget untuk pecinta outdoor Indonesia!', name: 'Erik Santoso', city: 'Surabaya, Jawa Timur' },
              { img: 'avatar-budi-santoso', alt: 'Agus Prasetyo', product: 'Kujang Khas Sunda', text: 'Kujang Khas Sunda yang saya pesan benar-benar autentik dan sangat indah. Craftsmanship-nya luar biasa, terasa nilai budayanya. Sampai ke Medan dalam kondisi sempurna dengan packaging aman.', name: 'Agus Prasetyo', city: 'Medan, Sumatera Utara' },
              { img: 'avatar-darmono-agus', alt: 'Darmono Agus', product: 'Cangkul Gagang Kayu Jati', text: 'Cangkul Gagang Kayu Jati-nya sangat memuaskan! Gagang kayunya halus tidak menyakiti tangan, dan cangkulnya berat-ringan pas untuk berkebun di rumah. Harga juga sangat worth it!', name: 'Darmono Agus', city: 'Jakarta, DKI Jakarta' },
              { img: 'avatar-deni-firmansyah', alt: 'Deni Firmansyah', product: 'Pisau Camping Lipat', text: 'Pesan dari Makassar ke Bandung, barang datang dalam 4 hari. Pisau Camping Lipat-nya compact dan tajam, perfect untuk saya yang sering camping di Sulawesi. Terima kasih PisauNusantara!', name: 'Deni Firmansyah', city: 'Makassar, Sulawesi Selatan' },
            ].map((t) => (
              <div key={t.name} className="testi-card">
                <img src={`/images/${t.img}.webp`} className="testi-avatar" alt={t.alt} loading="lazy" width={48} height={48} />
                <div className="stars">★★★★★</div>
                <div className="testi-product">{t.product}</div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">
                  <div>
                    <span className="author-name">{t.name}</span>
                    <span className="author-city">{t.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Pertanyaan yang Sering Diajukan</h2>
            <span className="section-line"></span>
            <p>Temukan jawaban atas pertanyaan umum seputar produk dan layanan PisauNusantara</p>
          </div>
          <div className="faq-wrap">
            {[
              { q: 'Apakah golok dan kampak PisauNusantara terbuat dari baja berkualitas?', a: 'Ya, seluruh produk PisauNusantara menggunakan baja carbon grade tinggi yang dipilih oleh pengrajin berpengalaman kami di Bandung. Baja kami diproses dengan teknik tempa tradisional yang menghasilkan ketajaman optimal dan daya tahan jangka panjang.' },
              { q: 'Bagaimana cara memesan pisau survival atau pisau tactical?', a: 'Pemesanan dilakukan melalui WhatsApp di nomor +62 821-1518-6138. Cukup kirim pesan dengan menyebutkan nama produk yang diminati, dan tim kami akan merespons dengan cepat.' },
              { q: 'Apakah tersedia pisau camping dan hiking yang cocok untuk pemula?', a: 'Tentu! Kami menyediakan Pisau Camping Lipat dan Pisau Hiking Ringan yang dirancang ergonomis, ringan, dan mudah digunakan untuk pemula outdoor.' },
              { q: 'Berapa lama pengiriman ke luar Jawa seperti Kalimantan dan Sulawesi?', a: 'Pengiriman ke Kalimantan dan Sulawesi umumnya 3–7 hari kerja. Kami bermitra dengan JNE, J&T, dan Sicepat untuk memastikan produk sampai aman.' },
              { q: 'Apakah ada garansi untuk produk kujang dan pisau berburu?', a: 'Semua produk PisauNusantara dilengkapi garansi kualitas. Jika produk mengalami cacat produksi, kami siap mengganti atau memperbaiki. Kepuasan pelanggan adalah prioritas utama kami sejak 2016.' },
              { q: 'Bisa pesan custom ukuran atau desain khusus untuk pisau?', a: 'Ya, kami melayani pemesanan custom pisau dengan ukuran, desain, atau ukiran khusus. Tersedia untuk pisau survival, pisau berburu, golok, dan kujang. Hubungi kami via WhatsApp untuk diskusi.' },
            ].map((f) => (
              <div key={f.q} className="faq-item">
                <div className="faq-q" role="button" aria-expanded="false">
                  <span>{f.q}</span>
                  <span className="faq-icon">+</span>
                </div>
                <div className="faq-a" role="region">
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-left">
              <h2>Hubungi Kami Sekarang</h2>
              <span className="section-line" style={{margin:'12px 0 20px'}}></span>
              <p>Siap membantu Anda memilih perkakas kebun dan pisau outdoor terbaik. Tim kami aktif Senin–Sabtu pukul 08.00–17.00 WIB.</p>
              <a href={WA_URL} className="btn-wa-big" target="_blank" rel="noopener noreferrer" onClick={trackConversion}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width={22} height={22}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat WhatsApp Sekarang
              </a>
            </div>
            <div className="contact-right">
              <h3>Informasi Kontak</h3>
              <div className="contact-item"><span className="c-icon">📱</span><div><div className="c-label">WhatsApp</div><div className="c-val">+62 821-1518-6138</div></div></div>
              <div className="contact-item"><span className="c-icon">📧</span><div><div className="c-label">Email</div><div className="c-val">info@pisaunusantara.com</div></div></div>
              <div className="contact-item"><span className="c-icon">📍</span><div><div className="c-label">Alamat</div><div className="c-val">Jl. Raya Bojongsoang No.85, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40288</div></div></div>
              <div className="contact-item"><span className="c-icon">🕐</span><div><div className="c-label">Jam Operasional</div><div className="c-val">Senin–Sabtu, 08.00–17.00 WIB</div></div></div>
              <div className="maps-box">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.238993416676!2d107.63422399999999!3d-6.9811005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9e4802a567b%3A0x64b7c86f5b41811b!2sPisau%20Nusantara!5e0!3m2!1sen!2sid!4v1778324315341!5m2!1sen!2sid"
                  width="100%" height="100%" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokasi PisauNusantara di Google Maps">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand-name">Pisau<span>Nusantara</span></div>
              <div className="footer-brand-tag">Sahabat Berkebun Pilihan Anda</div>
              <p className="footer-about">Toko perkakas kebun dan pisau outdoor terpercaya di Indonesia sejak 2016. Dibuat pengrajin lokal Bandung dengan baja berkualitas dan kearifan lokal Nusantara.</p>
            </div>
            <div className="footer-col">
              <h4>Menu</h4>
              <nav className="footer-links" aria-label="Footer navigation">
                <a href="#hero">Beranda</a>
                <a href="#produk">Produk</a>
                <a href="#tentang">Tentang Kami</a>
                <a href="#keunggulan">Keunggulan</a>
                <a href="#testimoni">Testimoni</a>
                <a href="#kontak">Kontak</a>
              </nav>
            </div>
            <div className="footer-col">
              <h4>Produk Kami</h4>
              <ul className="footer-products">
                {['Golok','Arit','Kampak','Kujang','Pisau Tactical','Pisau Survival','Pisau Camping','Pisau Hiking','Pisau Berburu','Cangkul','Sekop'].map(p => (
                  <li key={p}><a href="#produk">{p}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 PisauNusantara. Made with Love | Jl. Raya Bojongsoang No.85 Bandung-Indonesia</p>
          </div>
        </div>
      </footer>
    </>
  )
}
