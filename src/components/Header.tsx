"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "./Brand";

const links = [["Serviços", "#servicos"], ["Produtos", "#produtos"], ["Sobre", "#sobre"], ["Galeria", "#galeria"], ["Localização", "#localizacao"]];
export function Header({ onBooking }: { onBooking: () => void }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container header-inner"><Brand /><nav className={open ? "nav open" : "nav"} aria-label="Navegação principal">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<button className="button button-red nav-cta" onClick={() => { setOpen(false); onBooking(); }}>Agendar pelo WhatsApp</button></nav><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X /> : <Menu />}</button></div></header>;
}
