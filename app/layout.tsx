import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import useTheme from './lib/theme/useTheme'
import Header from './(main)/components/header/header'
import Footer from './(main)/components/footer/footer'
import Providers from './components/providers'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'ProfAssistant',
  description: 'O assistente favorito dos professores de todo o Brasil. Por aqui você poderá gerenciar questões, atividades, além de utilizar de IA para gerar conteúdo simples e rápido.',
  icons: {
    icon: "favicon.ico"
  }
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
        <Toaster position='bottom-right' />
        <Providers>
          <Header />
          <main className='m-3 md:m-5 lg:m-10 xl:m-14 min-h-[75vh]'>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
