import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "./site-url";

describe("resolveSiteUrl", () => {
  it("ignora a configuração vazia e usa a URL de produção da Vercel", () => {
    expect(resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "",
      VERCEL_PROJECT_PRODUCTION_URL: "petshop.vercel.app",
      VERCEL_URL: "preview.vercel.app",
    }).href).toBe("https://petshop.vercel.app/");
  });

  it("prioriza e normaliza a URL explicitamente configurada", () => {
    expect(resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: " https://petshop.example.com/algum-caminho ",
      VERCEL_PROJECT_PRODUCTION_URL: "petshop.vercel.app",
      VERCEL_URL: undefined,
    }).href).toBe("https://petshop.example.com/");
  });

  it("usa a URL do deployment atual quando não há URL de produção", () => {
    expect(resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: undefined,
      VERCEL_PROJECT_PRODUCTION_URL: undefined,
      VERCEL_URL: "petshop-git-feature.vercel.app",
    }).href).toBe("https://petshop-git-feature.vercel.app/");
  });

  it("usa localhost quando todas as variáveis estão ausentes ou inválidas", () => {
    expect(resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "url inválida",
      VERCEL_PROJECT_PRODUCTION_URL: "",
      VERCEL_URL: undefined,
    }).href).toBe("http://localhost:3000/");
  });
});
