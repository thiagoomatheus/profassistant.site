import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ResponseAPIProvider from './(generator)/lib/contexts/ResponseAPIContext'

import useTheme from './lib/theme/useTheme'
import Header from './(main)/components/header/header'
import Footer from './(main)/components/footer/footer'
import Providers from './components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Question Generator',
  description: 'Gere suas questões de forma eficiente e prática',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { verifyTheme } = useTheme()
  
  const theme = verifyTheme()

  return (
    <html lang="pt-br" className={theme}>
      <body className={`${inter.className}`} >
        <Providers>
          <Header />
          <ResponseAPIProvider>
            <main className='m-3 md:m-5 lg:m-10 xl:m-14 min-h-[65.5vh]'>
              {children}
            </main>
          </ResponseAPIProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
