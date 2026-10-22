"use client";
import { useEffect, useRef } from "react";

/** Keep keyboard navigation inside an open dialog and restore its trigger. */
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.classList.add("modal-open");
    const focusable = () => Array.from(ref.current?.querySelectorAll<HTMLElement>('a[href], button, input, textarea, select, [tabindex="0"]') ?? []).filter(el => !el.hasAttribute("disabled") && el.getAttribute("type") !== "hidden");
    focusable()[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0]; const last = elements.at(-1);
      if (event.shiftKey && (document.activeElement === first || !ref.current?.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !ref.current?.contains(document.activeElement))) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.body.classList.remove("modal-open");
      previous?.focus();
    };
  }, [open, onClose]);
  return ref;
}
