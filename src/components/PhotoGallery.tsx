"use client";

import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { businessConfig } from "@/data/business";
import { galleryPhotos } from "@/data/photos";

export function PhotoGallery() {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const open = selected !== null;
  const photo = selected !== null ? galleryPhotos[selected] : null;

  function navigate(direction: number) {
    setSelected(index => index === null ? null : (index + direction + galleryPhotos.length) % galleryPhotos.length);
  }

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const scrollY = window.scrollY;
    const originalStyle = document.body.style.cssText;
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.cssText = originalStyle;
      document.documentElement.style.scrollBehavior = "auto";
      triggerRef.current?.focus({ preventScroll: true });
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, [open]);

  return <section id="galeria" className="section gallery-section">
    <div className="container">
      <div className="section-heading">
        <div><span className="kicker">Cheirinho de banho</span><h2>Quem passa por aqui, sai assim.</h2></div>
        <a className="text-link" href={businessConfig.instagramUrl} target="_blank" rel="noreferrer"><Camera /> Ver mais no Instagram</a>
      </div>
      <div id="pet-photo-grid" className={`gallery-grid${expanded ? " is-expanded" : ""}`}>
        {galleryPhotos.map((item, index) => <button
          type="button"
          className={`gallery-item${index >= 4 ? " gallery-extra-mobile" : ""}${index >= 6 ? " gallery-extra-desktop" : ""}`}
          key={item.src}
          aria-label={`Ampliar foto ${index + 1}: ${item.alt}`}
          aria-haspopup="dialog"
          onClick={event => { triggerRef.current = event.currentTarget; setSelected(index); }}
        >
          <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 50vw, (max-width: 1200px) 33vw, 380px" />
        </button>)}
      </div>
      <div className="center-action">
        <button className="button button-white" type="button" aria-expanded={expanded} aria-controls="pet-photo-grid" onClick={() => setExpanded(value => !value)}>{expanded ? "Ver menos fotos" : "Ver mais fotos"}</button>
      </div>
      <p className="gallery-note"><Camera /> Acompanhe <b>@{businessConfig.instagram}</b> para ver mais pets e novidades.</p>
    </div>
    <dialog
      ref={dialogRef}
      className="photo-lightbox"
      aria-label="Fotos dos pets atendidos"
      onCancel={event => { event.preventDefault(); setSelected(null); }}
      onClose={() => setSelected(null)}
      onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); }
      }}
    >
      {photo && <div className="lightbox-content">
        <div className="lightbox-toolbar">
          <span aria-live="polite" aria-atomic="true">{selected! + 1} / {galleryPhotos.length}</span>
          <button type="button" className="icon-button" aria-label="Fechar fotos" onClick={() => setSelected(null)}><X /></button>
        </div>
        <div className="lightbox-photo" onTouchStart={event => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }} onTouchEnd={event => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const touch = event.changedTouches[0];
          const dx = touch.clientX - start.x;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(touch.clientY - start.y)) navigate(dx < 0 ? 1 : -1);
        }} onTouchCancel={() => { touchStart.current = null; }}>
          <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, 1000px" loading="eager" />
        </div>
        <div className="lightbox-navigation">
          <button type="button" className="icon-button" aria-label="Foto anterior" onClick={() => navigate(-1)}><ChevronLeft /></button>
          <p>{photo.alt}</p>
          <button type="button" className="icon-button" aria-label="Próxima foto" onClick={() => navigate(1)}><ChevronRight /></button>
        </div>
      </div>}
    </dialog>
  </section>;
}
