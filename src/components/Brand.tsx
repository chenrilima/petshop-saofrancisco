import Image from "next/image";
export function Brand({ footer = false }: { footer?: boolean }) { return <a className={`brand ${footer ? "brand-footer" : ""}`} href="#inicio" aria-label="Pet Shop São Francisco — início"><Image src="/images/pet-shop-sao-francisco-logo.png" alt="Pet Shop São Francisco" width={174} height={84} priority={!footer} /></a>; }
