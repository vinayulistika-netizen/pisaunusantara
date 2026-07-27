import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FaqAccordion from '../../components/FaqAccordion'
import { getAllSlugs, getPostBySlug, resolveRelatedPosts } from '../../../lib/posts'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const { frontmatter } = post
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.tags?.join(', '),
    alternates: { canonical: frontmatter.canonical || `https://pisaunusantara.com/blog/${slug}` },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image ? [{ url: `https://pisaunusantara.com${frontmatter.image}` }] : [],
      url: `https://pisaunusantara.com/blog/${slug}`,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
    },
  }
}

const WA_URL =
  'https://wa.me/6282115186138?text=Halo%20PisauNusantara%2C%20saya%20ingin%20bertanya%20tentang%20produk%20Anda'

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { frontmatter, content } = post
  const relatedPosts = resolveRelatedPosts(frontmatter.relatedPosts)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image ? `https://pisaunusantara.com${frontmatter.image}` : undefined,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: {
      '@type': 'Person',
      name: frontmatter.author,
      jobTitle: frontmatter.authorTitle,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PisauNusantara',
      logo: { '@type': 'ImageObject', url: 'https://pisaunusantara.com/images/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://pisaunusantara.com/blog/${slug}` },
  }

  const faqSchema = frontmatter.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: frontmatter.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pisaunusantara.com' },
      { '@type': 'ListItem', position: 2, name: 'Artikel', item: 'https://pisaunusantara.com/blog' },
      { '@type': 'ListItem', position: 3, name: frontmatter.title, item: `https://pisaunusantara.com/blog/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar alwaysDark />

      <main className="article-main">
        <div className="article-header">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/blog">Artikel</Link></li>
                <li aria-current="page">{frontmatter.title}</li>
              </ol>
            </nav>
            {frontmatter.category && (
              <span className="article-category">{frontmatter.category}</span>
            )}
            <h1>{frontmatter.title}</h1>
            <p className="article-lead">{frontmatter.description}</p>
            <div className="article-meta">
              <div className="article-author-mini">
                <div className="author-avatar">PN</div>
                <div>
                  <strong>{frontmatter.author}</strong>
                  <span>{frontmatter.authorTitle}</span>
                </div>
              </div>
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </div>
        </div>

        {/* Intro block: key points + featured image side by side */}
        <div className="article-intro">
          <div className="container">
            <div className="article-intro-grid">

              <div className="article-intro-left">
                <div className="keypoints-box">
                  <div className="keypoints-header">
                    <span className="keypoints-icon">📋</span>
                    <h3>Yang Akan Anda Pelajari</h3>
                  </div>
                  <ul className="keypoints-list">
                    {(frontmatter.faq?.slice(0, 4) ?? frontmatter.tags?.slice(0, 4) ?? []).map((item, i) => (
                      <li key={i}>
                        <span className="kp-check">✓</span>
                        <span>{typeof item === 'object' ? item.question : item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="article-quick-meta">
                  <span>⏱ ~{Math.max(3, Math.ceil(content.split(' ').length / 200))} menit baca</span>
                  <span className="sep">·</span>
                  <span>🗂 {frontmatter.category || 'Artikel'}</span>
                  <span className="sep">·</span>
                  <span>✍️ {frontmatter.author}</span>
                </div>
              </div>

              {frontmatter.image && (
                <div className="article-intro-right">
                  <div className="article-img-frame">
                    <img
                      src={frontmatter.image}
                      alt={frontmatter.imageAlt || frontmatter.title}
                      width={420}
                      height={300}
                    />
                    {frontmatter.category && (
                      <span className="article-img-badge">{frontmatter.category}</span>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="container">
          <div className="article-layout">
            <article className="article-content">
              <MDXRemote
                source={content}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                components={{
                  table: (props) => (
                    <div className="table-wrap">
                      <table {...props} />
                    </div>
                  ),
                }}
              />

              {frontmatter.faq?.length > 0 && (
                <section className="article-faq">
                  <h2>Pertanyaan yang Sering Ditanyakan</h2>
                  <FaqAccordion items={frontmatter.faq} />
                </section>
              )}

              <div className="article-cta">
                <h3>Tertarik dengan Pisau Buatan Pengrajin Lokal?</h3>
                <p>Kami siap membantu Anda menemukan pisau yang tepat sesuai kebutuhan. Konsultasi gratis via WhatsApp!</p>
                <a href={WA_URL} className="btn-primary" target="_blank" rel="noopener noreferrer">
                  💬 Hubungi Kami via WhatsApp
                </a>
              </div>

              <div className="article-author-box">
                <div className="author-avatar-lg">PN</div>
                <div className="author-info">
                  <strong>{frontmatter.author}</strong>
                  <span>{frontmatter.authorTitle}</span>
                  <p>Berpengalaman lebih dari 8 tahun dalam pembuatan dan penelitian pisau tradisional Nusantara. Berbasis di Bandung, Jawa Barat.</p>
                </div>
              </div>
            </article>

            <aside className="article-sidebar">
              <div className="sidebar-card">
                <h3>Pesan Produk</h3>
                <p>Konsultasi langsung dengan pengrajin kami untuk mendapatkan pisau yang sesuai kebutuhan Anda.</p>
                <a href={WA_URL} className="btn-primary btn-full" target="_blank" rel="noopener noreferrer">
                  💬 Chat WhatsApp
                </a>
                <Link href="/#produk" className="sidebar-btn-outline btn-full">
                  Lihat Semua Produk
                </Link>
              </div>

              {frontmatter.tags?.length > 0 && (
                <div className="sidebar-card">
                  <h3>Tag Artikel</h3>
                  <div className="tag-list">
                    {frontmatter.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {relatedPosts.length > 0 && (
                <div className="sidebar-card">
                  <h3>Artikel Terkait</h3>
                  <ul className="related-list">
                    {relatedPosts.map((rel) => (
                      <li key={rel.slug}>
                        <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
