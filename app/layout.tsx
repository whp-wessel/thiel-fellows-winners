import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Thiel Fellowship Winners',
  description: 'Semantic search for all Thiel Fellowship winners.',
  twitter: {
    card: "summary_large_image",
    title: "Thiel Fellowship Winners 🚀",
    description: "Semantic search for all Thiel Fellowship winners.",
    creator: "@whp_wessel based on @nabeelqu & @thesephist",
    images: ["https://pbs.twimg.com/profile_images/924457928513298438/g8_U3yqC_400x400.jpg"],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
