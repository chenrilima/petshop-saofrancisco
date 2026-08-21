import { describe, expect, it } from "vitest";
import { bookingMessage, cartMessage, createWhatsAppUrl, normalizePhone } from "./whatsapp";

describe("WhatsApp helpers", () => {
  it("normaliza o telefone", () => expect(normalizePhone("+55 (11) 99999-9999")).toBe("5511999999999"));
  it("monta agendamento com dados dinâmicos", () => {
    const text = bookingMessage({ services: ["Banho", "Tosa"], petName: "Mel", petType: "Cachorro", breed: "Shih-tzu", size: "Pequeno", age: "Adulto", notes: "Primeiro atendimento", date: "2026-08-25", period: "Manhã", customerName: "Carlos" });
    expect(text).toContain("Mel"); expect(text).toContain("25/08/2026"); expect(text).toContain("Banho, Tosa");
  });
  it("monta consulta de produtos", () => expect(cartMessage([{ name: "Petisco", quantity: 2 }], "Carlos", "")).toContain("2x Petisco"));
  it("gera link externo do WhatsApp", () => expect(createWhatsAppUrl("Olá")).toMatch(/^https:\/\/wa\.me\/5511977999868\?text=/));
});
