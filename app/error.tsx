'use client'
import { useEffect } from 'react'
import Button from './components/layout/button'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div>
      <h2>Erro</h2>
      <p>Aconteceu algo de errado! Por favor clique no botão abaixo para recarregar a página. Porém, se o erro persisir, tente novamente.</p>
      <p>Erro: {error.message}</p>
      <Button 
        key={"Refresh"}
        text='Recarregar'
        handleClick={() => reset()}
      />
    </div>
  )
}