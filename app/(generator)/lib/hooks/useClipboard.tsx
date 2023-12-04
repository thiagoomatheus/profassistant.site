import { useCallback } from 'react';

export default async function useClipboard() {
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Texto copiado para a área de transferência');
    } catch (err) {
      console.log('Falha ao copiar o texto', err);
    }
  }, []);

  return copyToClipboard;
}