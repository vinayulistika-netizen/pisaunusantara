import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getAllPosts } from '../../lib/posts'

export const metadata = {
  title: 'Artikel & Tips Pisau Outdoor | Blog PisauNusantara',
  description: 'Artikel informatif seputar pisau survival, golok, pisau tactical, tips merawat pisau, dan panduan outdoor dari pengrajin lokal Bandung.',
  alternates: { canonical: 'https://pisaunusantara.com/blog' },
  openGraph: {
    title: 'Artikel & Tips Pisau Outdoor | Blog PisauNusantara',
    description: 'Tips dan panduan pisau outdoor dari pengrajin lokal Bandung sejak 2016.',
    url: 'https://pisaunusantara.com/blog',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <>
      <Navbar alwaysDark />

      {/* Hero Banner */}
      <section className="blog-banner">
        <div className="container blog-banner-inner">
          <div className="blog-banner-text">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">Artikel</li>
              </ol>
            </nav>
            <div className="blog-banner-badge">Tips & Panduan</div>
            <h1>Artikel Pisau Outdoor</h1>
            <p>Panduan memilih, merawat, dan menggunakan perkakas terbaik dari pengrajin lokal Bandung sejak 2016</p>
            <div className="blog-banner-stats">
              <div><strong>{posts.length}</strong><span>Artikel</span></div>
              <div><strong>8+</strong><span>Tahun Pengalaman</span></div>
              <div><strong>1000+</strong><span>Pembeli Puas</span></div>
            </div>
          </div>

        </div>
      </section>

      <main className="blog-main">
        <div className="container">

          {posts.length === 0 ? (
            <div className="blog-empty">
              <div className="blog-empty-icon">✍️</div>
              <h2>Artikel Segera Hadir</h2>
              <p>Kami sedang menyiapkan konten berkualitas untuk Anda. Pantau terus!</p>
              <Link href="/" className="btn-primary-blog">Kembali ke Beranda</Link>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featured && (
                <div className="blog-featured">
                  <div className="blog-featured-label">⭐ Artikel Pilihan</div>
                  <Link href={`/blog/${featured.slug}`} className="blog-featured-card">
                    <div className="blog-featured-img-wrap">
                      {featured.frontmatter.image && (
                        <img
                          src={featured.frontmatter.image}
                          alt={featured.frontmatter.imageAlt || featured.frontmatter.title}
                          width={700}
                          height={420}
                        />
                      )}
                      {featured.frontmatter.category && (
                        <span className="blog-cat-badge">{featured.frontmatter.category}</span>
                      )}
                    </div>
                    <div className="blog-featured-body">
                      <h2>{featured.frontmatter.title}</h2>
                      <p>{featured.frontmatter.description}</p>
                      <div className="blog-featured-meta">
                        <span>✍️ {featured.frontmatter.author}</span>
                        <span>📅 {new Date(featured.frontmatter.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <span className="blog-read-more">Baca Selengkapnya →</span>
                    </div>
                  </Link>
                </div>
              )}

              {/* Rest of articles */}
              {rest.length > 0 && (
                <>
                  <h2 className="blog-section-title">Artikel Lainnya</h2>
                  <div className="blog-grid">
                    {rest.map((post) => (
                      <article key={post.slug} className="blog-card">
                        <Link href={`/blog/${post.slug}`} className="blog-card-img-link">
                          {post.frontmatter.image && (
                            <img
                              src={post.frontmatter.image}
                              alt={post.frontmatter.imageAlt || post.frontmatter.title}
                              className="blog-card-img"
                              loading="lazy"
                              width={400}
                              height={220}
                            />
                          )}
                          {post.frontmatter.category && (
                            <span className="blog-cat-badge">{post.frontmatter.category}</span>
                          )}
                        </Link>
                        <div className="blog-card-body">
                          <h3 className="blog-card-title">
                            <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
                          </h3>
                          <p className="blog-card-desc">{post.frontmatter.description}</p>
                          <div className="blog-card-footer">
                            <span className="blog-card-date">{new Date(post.frontmatter.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            <Link href={`/blog/${post.slug}`} className="blog-card-link">Baca →</Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* CTA Section */}
          <div className="blog-cta-box">
            <div className="blog-cta-content">
              <h3>Butuh Pisau yang Tepat?</h3>
              <p>Konsultasikan kebutuhan Anda langsung dengan pengrajin kami. Gratis, tanpa tekanan.</p>
              <a
                href="https://wa.me/6282115186138?text=Halo%20PisauNusantara%2C%20saya%20ingin%20bertanya%20tentang%20produk%20Anda"
                className="btn-primary-blog"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Chat WhatsApp Sekarang
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
