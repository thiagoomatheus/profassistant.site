import toast from "react-hot-toast";

export default function useClipboard() {
  async function copyToClipboard (text: string) {
    try {
      await navigator.clipboard.writeText(text)
      return toast.success("Copiado com sucesso")
    } catch (err) {
      return toast.error("Erro ao copiar, tente novamente mais tarde")
    }
  }
  return copyToClipboard;
}