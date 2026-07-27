import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export function getAllSlugs() {
  if (!fs.existsSync(contentDir)) return []
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getPostBySlug(slug) {
  const filePath = path.join(contentDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { slug, frontmatter: data, content }
}

// Terima relatedPosts dalam dua format: daftar slug ("cara-memilih-golok")
// atau objek ({ slug, title }). Judul diambil dari artikelnya sendiri kalau
// tidak ditulis, dan slug yang artikelnya tidak ada dibuang supaya tidak
// pernah muncul link ke halaman 404.
export function resolveRelatedPosts(relatedPosts) {
  if (!Array.isArray(relatedPosts)) return []
  return relatedPosts
    .map((rel) => {
      const slug = typeof rel === 'string' ? rel : rel?.slug
      if (!slug) return null
      const post = getPostBySlug(slug)
      if (!post) return null
      const title = (typeof rel === 'object' && rel?.title) || post.frontmatter.title
      if (!title) return null
      return { slug, title }
    })
    .filter(Boolean)
}

export function getAllPosts() {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
}
