import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { businessConfig } from "@/data/business";
import { isLocalSiteUrl, siteUrl } from "@/lib/site-url";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Pet Shop São Francisco | Banho e Tosa em Taboão da Serra",
  description: "Banho, tosa e cuidados para pets no Parque Pinheiros, em Taboão da Serra. Solicite seu horário pelo WhatsApp.",
  openGraph: { title: "Pet Shop São Francisco", description: "Cuidado próximo para o seu pet em Taboão da Serra.", type: "website", locale: "pt_BR", images: ["/images/pets-sao-francisco-hero.png"] },
  twitter: { card: "summary_large_image", title: "Pet Shop São Francisco", description: "Banho e tosa em Taboão da Serra.", images: ["/images/pets-sao-francisco-hero.png"] },
  alternates: !isLocalSiteUrl ? { canonical: "/" } : undefined,
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4aa18" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { "@context": "https://schema.org", "@type": "PetStore", name: businessConfig.name, address: { "@type": "PostalAddress", streetAddress: "Rua Manoel Otaviano Diniz Junqueira Filho", addressLocality: "Taboão da Serra", addressRegion: "SP", postalCode: "06766-130", addressCountry: "BR" }, openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "19:00" }], sameAs: [businessConfig.instagramUrl] };
  return <html lang="pt-BR" className={`${manrope.variable} ${playfair.variable}`}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></body></html>;
}
