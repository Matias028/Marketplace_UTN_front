import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'




import './globals.css'

export const metadata: Metadata = {
  title: 'MarketPlace UTN',
  description: 'Plataforma de compra y venta de vehículos usada - Proyecto Final UTN',
  generator: 'Matias Gonzalez',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
