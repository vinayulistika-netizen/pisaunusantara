import { getAllPosts } from '../lib/posts'

const BASE_URL = 'https://pisaunusantara.com'

export default function sitemap() {
  const posts = getAllPosts()

  // `updated` = tanggal artikel terakhir diperbarui (isi hanya kalau memang ada
  // perubahan berarti). Kalau kosong, pakai tanggal terbit seperti semula.
  const articleUrls = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.updated || post.frontmatter.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...articleUrls,
  ]
}
