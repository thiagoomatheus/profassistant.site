'use client'
import Button from "./components/layout/button"
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Um erro aconteceu: {error.message}</h2>
        <Button 
        key={"Refresh"}
        text='Recarregar'
        handleClick={() => reset()}
      />
      </body>
    </html>
  )
}