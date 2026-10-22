// @vitest-environment jsdom
import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BookingModal } from "./BookingModal";

vi.stubGlobal("React", React);
afterEach(cleanup);

describe("Agendamento para cachorros", () => {
  it("valida os campos e leva o novo serviço até o WhatsApp sem pedir espécie", () => {
    render(<BookingModal open onClose={() => {}} />);
    const next = () => fireEvent.click(screen.getByRole("button", { name: /Continuar/ }));
    next();
    expect(screen.getByRole("alert").textContent).toContain("Preencha");
    expect(screen.getByLabelText("Banho + Tosa")).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Banho + Tosa higiênica"));
    next();
    expect(screen.queryByText(/Tipo do animal/)).toBeNull();
    expect(screen.queryByRole("button", { name: "Gato" })).toBeNull();
    fireEvent.change(screen.getByLabelText("Nome do cachorro *"), { target: { value: "Mel" } });
    next();
    fireEvent.click(screen.getByRole("button", { name: "Pequeno" }));
    next();
    fireEvent.click(screen.getByRole("button", { name: "Idoso" }));
    fireEvent.change(screen.getByLabelText(/Comportamento/), { target: { value: "Precisa de cuidado nas patas" } });
    next();
    fireEvent.change(screen.getByLabelText("Data desejada *"), { target: { value: "2026-12-20" } });
    fireEvent.click(screen.getByRole("button", { name: "Manhã" }));
    next();
    fireEvent.change(screen.getByLabelText("Seu nome *"), { target: { value: "Ana" } });
    next();
    expect(screen.getByText("Mel · Cachorro")).toBeTruthy();
    const href = screen.getByRole("link", { name: /Enviar pelo WhatsApp/ }).getAttribute("href")!;
    const message = new URL(href).searchParams.get("text")!;
    for (const expected of ["Banho + Tosa higiênica", "Tipo: Cachorro", "Porte: Pequeno", "Fase: Idoso", "20/12/2026", "Precisa de cuidado nas patas", "Responsável: Ana"]) expect(message).toContain(expected);
    expect(message).not.toContain("escovação");
  });
  it("fecha por Escape e devolve o foco ao acionador", () => {
    const close = vi.fn();
    const trigger = document.createElement("button");
    document.body.append(trigger); trigger.focus();
    const view = render(<BookingModal open onClose={close} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(close).toHaveBeenCalledOnce();
    view.unmount(); expect(document.activeElement).toBe(trigger); trigger.remove();
  });
});
