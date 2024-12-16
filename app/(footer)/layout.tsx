export default function FooterLayout({children}: {children: React.ReactNode}) {
    return <section className="flex flex-col gap-5 lg:gap-10">{children}</section>
  }