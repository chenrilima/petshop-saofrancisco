export const businessConfig = {
  name: "Pet Shop São Francisco",
  shortName: "São Francisco",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511977999868",
  instagram: "petshop.sao.francisco",
  instagramUrl: "https://www.instagram.com/petshopsao.francisco/",
  address: "Rua Manoel Otaviano Diniz Junqueira Filho, Parque Pinheiros, Taboão da Serra - SP, 06766-130",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Manoel+Otaviano+Diniz+Junqueira+Filho%2C+Tabo%C3%A3o+da+Serra%2C+SP%2C+06766-130",
  mapsEmbedUrl: "https://www.google.com/maps?q=Rua+Manoel+Otaviano+Diniz+Junqueira+Filho%2C+Tabo%C3%A3o+da+Serra%2C+SP%2C+06766-130&output=embed",
  rating: { value: "5,0", count: 22 },
  hours: [
    ["Segunda a sexta", "08:00–19:00"],
    ["Sábado", "08:00–19:00"],
    ["Domingo", "Fechado"],
  ] as const,
} as const;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
