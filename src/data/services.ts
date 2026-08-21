import { Bath, Bone, Scissors, ShowerHead, Sparkles, WandSparkles } from "lucide-react";

export const services = [
  { id: "banho", name: "Banho", description: "Higiene e cuidado para deixar seu pet limpo e confortável.", icon: ShowerHead, featured: true, active: true, order: 1 },
  { id: "tosa", name: "Tosa", description: "Tosa feita com atenção ao porte e às necessidades do pet.", icon: Scissors, featured: true, active: true, order: 2 },
  { id: "banho-tosa", name: "Banho + Tosa", description: "O cuidado completo em uma única solicitação.", icon: Sparkles, featured: true, active: true, order: 3 },
  { id: "escovacao", name: "Banho e escovação", description: "Banho com atenção especial à pelagem.", icon: Bath, active: true, order: 4 },
  { id: "tosa-estilizada", name: "Tosa estilizada", description: "Consulte as possibilidades para o seu pet.", icon: WandSparkles, active: true, order: 5 },
  { id: "unhas-higiene", name: "Unhas e higiene", description: "Corte de unhas e cuidados básicos de higiene.", icon: Bone, active: true, order: 6 },
] as const;

export type ServiceId = (typeof services)[number]["id"];
