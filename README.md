# Pet Shop São Francisco

Site institucional e catálogo com conversão via WhatsApp, construído em Next.js.

## Rodando localmente

1. Copie `.env.example` para `.env.local`.
2. Preencha `NEXT_PUBLIC_WHATSAPP_NUMBER` somente com números (DDI + DDD + número).
3. Execute `npm install` e `npm run dev`.

`NEXT_PUBLIC_SITE_URL` é opcional na Vercel, que fornece automaticamente a URL do projeto. Para usar um domínio próprio como URL canônica, configure a variável com a URL completa (por exemplo, `https://dominio.com.br`, sem caminho).

## Dados editáveis

- Empresa, endereço e horários: `src/data/business.ts`
- Serviços: `src/data/services.ts`
- Produtos demonstrativos: `src/data/products.ts`
- Perguntas frequentes: `src/data/content.ts`
