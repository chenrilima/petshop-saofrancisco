// @vitest-environment jsdom
import * as React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { PhotoGallery } from "./PhotoGallery";
import { galleryPhotos, heroPhoto, petPhotos, storyPhoto } from "@/data/photos";

vi.stubGlobal("React", React);
vi.mock("next/image", () => ({ default: ({ fill: _fill, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => { void _fill; return React.createElement("img", props); } }));
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("Galeria de fotos reais", () => {
  it("distribui as 14 fotos sem repetir Hero e Sobre na galeria", () => {
    expect(new Set([heroPhoto, storyPhoto, ...galleryPhotos]).size).toBe(14);
    expect(petPhotos).toHaveLength(14);
  });

  it("expande e recolhe a galeria", () => {
    render(<PhotoGallery />);
    const toggle = screen.getByRole("button", { name: "Ver mais fotos" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(toggle.textContent).toBe("Ver menos fotos");
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("abre a foto escolhida, navega circularmente e restaura foco e rolagem", () => {
    render(<PhotoGallery />);
    const trigger = screen.getByRole("button", { name: /^Ampliar foto 1:/ });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog");
    expect(dialog.textContent).toContain("1 / 12");
    expect(document.body.style.position).toBe("fixed");
    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    expect(dialog.textContent).toContain("12 / 12");
    fireEvent.click(screen.getByRole("button", { name: "Próxima foto" }));
    expect(dialog.textContent).toContain("1 / 12");
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(dialog.textContent).toContain("2 / 12");
    fireEvent(dialog, new Event("cancel", { bubbles: false, cancelable: true }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.body.style.position).toBe("");
    expect(document.activeElement).toBe(trigger);
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it("navega por gesto e fecha pelo botão", () => {
    render(<PhotoGallery />);
    fireEvent.click(screen.getByRole("button", { name: /^Ampliar foto 1:/ }));
    const dialog = screen.getByRole("dialog");
    const photo = dialog.querySelector(".lightbox-photo")!;
    fireEvent.touchStart(photo, { touches: [{ clientX: 250, clientY: 100 }] });
    fireEvent.touchEnd(photo, { changedTouches: [{ clientX: 100, clientY: 110 }] });
    expect(dialog.textContent).toContain("2 / 12");
    fireEvent.click(screen.getByRole("button", { name: "Fechar fotos" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
