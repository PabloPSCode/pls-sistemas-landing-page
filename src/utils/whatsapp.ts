const phoneNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_CONTACT || "5599199999999"; // Substitua pelo número de telefone desejado

const defaultMessage =
  "Olá! Gostaria de saber mais sobre os serviços da PLS Sistemas.";

const htmlEntityMap: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

function decodeHtmlEntities(value: string) {
  return value.replace(
    /&(nbsp|amp|lt|gt|quot|#39);/g,
    (entity) => htmlEntityMap[entity] || entity,
  );
}

function formatMessageForWhatsApp(message: string) {
  const formattedMessage = message
    .replace(/\r\n/g, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<(strong|b)[^>]*>/gi, "*")
    .replace(/<\/(strong|b)>/gi, "*")
    .replace(/<(em|i)[^>]*>/gi, "_")
    .replace(/<\/(em|i)>/gi, "_")
    .replace(/<code[^>]*>/gi, "`")
    .replace(/<\/code>/gi, "`")
    .replace(/<(h[1-6]|p|div|section|article)[^>]*>/gi, "")
    .replace(/<\/(h[1-6]|p|div|section|article)>/gi, "\n")
    .replace(/<ul[^>]*>/gi, "")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "");

  return decodeHtmlEntities(formattedMessage)
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function startWhatsAppChat(message?: string) {
  const parsedMessage = formatMessageForWhatsApp(message || defaultMessage);
  const encodedMessage = encodeURIComponent(parsedMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  if (typeof window !== "undefined") {
    window.open(whatsappUrl, "_blank");
  }
}
