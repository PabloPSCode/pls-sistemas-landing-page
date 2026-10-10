"use client";
import { startWhatsAppChat } from "@/utils/whatsapp";

export default function ConversationButton() {
  return (
    <button
      onClick={() =>
        startWhatsAppChat(
          "Olá! Gostaria de saber mais sobre os serviços da PLS Sistemas.",
        )
      }
      className="inline-flex justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:bg-foreground/86"
    >
        Conversar no WhatsApp
    </button>
  );
}
