import { NextResponse } from 'next/server';

// URL WordPress lama (?page_id=55, ?p=1, dst) sebelumnya dibiarkan tampil
// sebagai homepage (200) tanpa redirect resmi, karena next.config.js
// `redirects()` otomatis meneruskan query string ke destination sehingga
// / -> / dengan query yang sama menyebabkan infinite loop.
//
// Di sini kita bangun URL tujuan secara manual (new URL('/', request.url)),
// jadi query string lama TIDAK ikut terbawa dan tidak ada loop.
const legacyWordPressQueryKeys = ['page_id', 'p'];

export function proxy(request) {
  const { pathname, searchParams } = request.nextUrl;

  if (
    pathname === '/' &&
    legacyWordPressQueryKeys.some((key) => searchParams.has(key))
  ) {
    return NextResponse.redirect(new URL('/', request.url), 308);
  }
}

export const config = {
  matcher: '/',
};
