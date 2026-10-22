import Image from "next/image";
export function Brand({ footer = false }: { footer?: boolean }) { return <a className={`brand ${footer ? "brand-footer" : ""}`} href="#inicio" aria-label="Pet Shop São Francisco — início"><Image src="/images/pet-shop-sao-francisco-logo.webp" alt="Pet Shop São Francisco" width={382} height={355} sizes={footer ? "170px" : "114px"} preload={!footer} /></a>; }
