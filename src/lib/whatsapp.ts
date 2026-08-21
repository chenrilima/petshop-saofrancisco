import { businessConfig } from "@/data/business";

export type BookingData = {
  services: string[]; petName: string; petType: string; breed: string; size: string;
  age: string; notes: string; date: string; period: string; customerName: string;
};

export type CartMessageItem = { name: string; quantity: number };

export function normalizePhone(value: string) { return value.replace(/\D/g, ""); }

export function createWhatsAppUrl(message: string) {
  const phone = normalizePhone(businessConfig.whatsapp);
  if (!phone) throw new Error("Número do WhatsApp não configurado.");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function generalMessage(context = "atendimento") {
  return `Olá! Vim pelo site do ${businessConfig.name} 🐾\n\nGostaria de falar sobre ${context}.`;
}

export function bookingMessage(data: BookingData) {
  const date = data.date ? data.date.split("-").reverse().join("/") : "A combinar";
  const details = [
    `🐾 Pet: ${data.petName}`,
    `📋 Serviço: ${data.services.join(", ")}`,
    `🐕 Tipo: ${data.petType}`,
    `📏 Porte: ${data.size}`,
    data.breed && `🧬 Raça: ${data.breed}`,
    data.age && `🎂 Fase: ${data.age}`,
    `📅 Preferência: ${date}`,
    `🕐 Período: ${data.period}`,
  ].filter(Boolean);
  return `Olá! Vim pelo site do ${businessConfig.name} 🐾\n\nGostaria de solicitar um agendamento.\n\n${details.join("\n")}\n\n${data.notes ? `📝 Observações:\n${data.notes}\n\n` : ""}👤 Responsável: ${data.customerName}\n\nPodem me confirmar a disponibilidade?`;
}

export function cartMessage(items: CartMessageItem[], name: string, notes: string) {
  const list = items.map((item) => `${item.quantity}x ${item.name}`).join("\n");
  return `Olá! Vim pelo site do ${businessConfig.name} 🐾\n\nGostaria de consultar estes produtos:\n\n🛒 Pedido:\n${list}\n\n👤 Nome: ${name}${notes ? `\n\n📝 Observações:\n${notes}` : ""}\n\nGostaria de confirmar disponibilidade e valores.`;
}
