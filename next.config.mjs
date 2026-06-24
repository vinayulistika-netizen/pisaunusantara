/** @type {import('next').NextConfig} */
const nextConfig = {
  // Catatan: aturan redirect untuk URL WordPress lama (?page_id=X, ?p=X) DIHAPUS.
  // Penyebab "Redirect error" di Google Search Console: query string selalu
  // diteruskan ke destination (lihat docs Next.js redirects), sehingga
  // /?page_id=59 -> / -> /?page_id=59 -> ... loop tak terbatas.
  // Tanpa aturan ini, URL lama menampilkan homepage (200) dan dikonsolidasikan
  // ke canonical homepage secara otomatis. Tidak perlu redirect.
}

export default nextConfig;
