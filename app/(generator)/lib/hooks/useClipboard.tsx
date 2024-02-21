import useNotification, { NotificationTypes } from "@/app/(notifications)/lib/hooks/useNotification";

export default async function useClipboard() {

  const { generateNotification } = useNotification()

  async function copyToClipboard (text: string) {

    try {
      await navigator.clipboard.writeText(text)
      return generateNotification(NotificationTypes.CopyToClipboardSuccess, "success")
    } catch (err) {
      return generateNotification(NotificationTypes.CopyToClipboardError, "error")
    }

  }

  return copyToClipboard;
}