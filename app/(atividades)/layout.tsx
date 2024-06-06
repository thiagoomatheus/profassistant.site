export default function AtividadesLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="flex flex-col gap-5">{children}</section>
}