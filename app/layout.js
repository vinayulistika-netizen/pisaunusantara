import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Jual Golok, Pisau Tactical & Kujang Bandung | Pisau Nusantara',
  description: 'Jual golok, pisau tactical, survival & kujang buatan pengrajin Bandung sejak 2016. Golok baja carbon kebun & outdoor, bisa custom, kirim se-Indonesia.',
  keywords: 'jual golok bandung, pisau tactical indonesia, pisau survival terbaik, jual kujang asli sunda, pisau camping outdoor, pisau hiking indonesia, toko perkakas bandung, jual arit cangkul sekop, pisau berburu profesional, pisaunusantara',
  robots: 'index, follow',
  icons: {
    icon: '/images/logo.webp',
    apple: '/images/logo.webp',
  },
  alternates: { canonical: 'https://pisaunusantara.com' },
  openGraph: {
    title: 'PisauNusantara — Toko Perkakas Kebun & Pisau Outdoor Terpercaya di Indonesia',
    description: 'Jual golok, pisau tactical, survival & kujang buatan pengrajin Bandung sejak 2016. Golok baja carbon kebun & outdoor, bisa custom, kirim se-Indonesia.',
    images: [{ url: 'https://pisaunusantara.com/og-image.jpg', width: 1200, height: 630 }],
    url: 'https://pisaunusantara.com',
    type: 'website',
  },
  verification: { google: 'XMaPY_HMBneVMgG10UqD1qfxhmsawZ6JzXgWwtGOam0' },
  other: { 'geo.region': 'ID-JB', 'geo.placename': 'Bandung' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <body>
        {children}

        {/* Google Ads */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17124070122" strategy="afterInteractive" />
        <Script id="google-ads-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17124070122');
        `}</Script>

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-Y20KKM0Q7K" strategy="afterInteractive" />
        <Script id="google-analytics-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Y20KKM0Q7K');
        `}</Script>
      </body>
    </html>
  )
}
