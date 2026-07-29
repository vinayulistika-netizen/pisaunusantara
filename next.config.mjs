/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirect untuk URL WordPress lama (?page_id=X, ?p=X) via next.config.js
  // `redirects()` DIHAPUS karena query string selalu diteruskan ke destination
  // (lihat docs Next.js redirects), sehingga /?page_id=59 -> / -> /?page_id=59
  // -> ... loop tak terbatas.
  // Solusinya sekarang ada di proxy.js (bukan di sini): proxy membangun URL
  // tujuan manual (new URL('/', request.url)) sehingga query string lama
  // TIDAK ikut terbawa -> 308 redirect bersih ke / tanpa loop.
}

export default nextConfig;
