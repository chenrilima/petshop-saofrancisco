export type Product = {
  id: string; name: string; category: string; description: string; emoji: string;
  brand?: string; price?: number; unit?: string; active: boolean; featured: boolean; order: number;
};

// Dados demonstrativos: substitua pelos itens realmente disponíveis na loja.
export const products: Product[] = [
  { id: "racao", name: "Rações para cães e gatos", category: "Rações", description: "Opções para diferentes fases e portes. Consulte marcas e tamanhos.", emoji: "🥣", active: true, featured: true, order: 1 },
  { id: "petiscos", name: "Petiscos", category: "Petiscos", description: "Uma seleção para agradar e recompensar seu companheiro.", emoji: "🦴", active: true, featured: true, order: 2 },
  { id: "higiene", name: "Itens de higiene", category: "Higiene", description: "Produtos para os cuidados do dia a dia do seu pet.", emoji: "🫧", active: true, featured: true, order: 3 },
  { id: "acessorios", name: "Acessórios", category: "Acessórios", description: "Itens úteis para passeio, alimentação e rotina.", emoji: "🦮", active: true, featured: false, order: 4 },
  { id: "brinquedos", name: "Brinquedos", category: "Brinquedos", description: "Opções para deixar a brincadeira ainda mais divertida.", emoji: "🎾", active: true, featured: false, order: 5 },
];
