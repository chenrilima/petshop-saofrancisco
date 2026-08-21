# Pet Shop São Francisco

Site institucional e catálogo com conversão via WhatsApp, construído em Next.js.

## Rodando localmente

1. Copie `.env.example` para `.env.local`.
2. Preencha `NEXT_PUBLIC_WHATSAPP_NUMBER` somente com números (DDI + DDD + número).
3. Execute `npm install` e `npm run dev`.

Antes do deploy, informe também `NEXT_PUBLIC_SITE_URL` com o domínio público.

## Dados editáveis

- Empresa, endereço e horários: `src/data/business.ts`
- Serviços: `src/data/services.ts`
- Produtos demonstrativos: `src/data/products.ts`
- Perguntas frequentes: `src/data/content.ts`
