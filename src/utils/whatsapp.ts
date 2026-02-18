const phoneNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER || "5599199999999"; // Substitua pelo número de telefone desejado

export function startWhatsAppChat(message?: string) {
  const encodedMessage = encodeURIComponent(
    message || "Olá! Gostaria de saber mais sobre os serviços da PLS Sistemas.",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  if (typeof window !== "undefined") {
    window.open(whatsappUrl, "_blank");
  }
}
