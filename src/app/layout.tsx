
import {Separator} from "@/components/ui/separator";

import { ThemeProvider } from '@/app/providers'
import { Container } from '@/components/Container'
import { NavBar } from '@/components/NavBar'
import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import Link from 'next/link'
import './global.css'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'


const meta = {
  title: 'TaeYeong Lee - Website',
  description:
    '隨處作主 立處皆眞',
  image: `${WEBSITE_HOST_URL}/og-preview.jpg`,
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const menu = [
  {
      name: "Home",
      href: "/"
  },
  {
      name: "About",
      href: "/about"
  }
]

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: '%s | Taeyeong Lee',
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: WEBSITE_HOST_URL,
    siteName: meta.title,
    locale: 'en-US',
    type: 'website',
    images: [
      {
        url: meta.image,
      },
    ],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    card: 'summary_large_image',
  },
  alternates: {
    canonical: WEBSITE_HOST_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"
          className={'scroll-smooth'}
    >
      <body
          className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <header className={'w-full sticky top-0'}>
                <NavBar menus={menu}/>
          </header>
          <main className={'py-16'}>
            <Container>{children}</Container>
          </main>
          <footer className="py-16">
            <Container>
              <p>
                Built by{' '}
                <Link className="link" href="https://github.com/10yii">
                  10yii
                </Link>
              </p>
            </Container>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
