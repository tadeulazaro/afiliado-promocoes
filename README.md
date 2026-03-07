# Afiliado Promoções

Site de ofertas com estrutura SEO + redirecionamento de links afiliados (`/go/[slug]`).

## O que já vem pronto
- Home com lista de promoções
- Páginas por categoria (`/categoria/[categoria]`)
- Página de detalhe da oferta (`/oferta/[slug]`)
- Redirecionamento de afiliado (`/go/[slug]`)
- `sitemap.xml` automático
- `robots.txt` bloqueando indexação de rotas de redirecionamento
- Página de transparência (`/aviso-afiliado`)
- Página prática de atualização (`/como-alimentar`)
- Layout claro e logo profissional em `public/logo-promoradar.svg`

## Rodar localmente
```bash
cd afiliado-promocoes
npm install
npm run dev
```

## Publicar na Vercel
1. Suba este diretório para um repositório no GitHub.
2. Importe o repo na Vercel.
3. Configure as variáveis:
   - `NEXT_PUBLIC_SITE_URL=https://seu-dominio.com`
   - `SESSION_SECRET=sua-chave-forte-e-unica`
   - `ADMIN_EMAIL=seu-admin@dominio.com`
   - `ADMIN_PASSWORD=sua-senha-forte`
   - `ADMIN_NAME=Administrador LT Radar`
4. Deploy.

## Marketplace de Afiliados (MVP)
- Cadastro de afiliado: `/auth/cadastro-afiliado`
- Login: `/auth/login`
- Painel do afiliado (cadastro de promoções): `/painel/afiliado`
- Painel admin (aprovação): `/painel/admin`

Fluxo:
1. Afiliado se cadastra com CPF, e-mail e senha.
2. Afiliado envia promoção (entra como pendente).
3. Admin aprova no painel.
4. Promoção aprovada aparece no site público com identificação do afiliado.

## Persistência de dados
- Os dados do marketplace são salvos em `data/marketplace-db.json`.
- Esse arquivo está no `.gitignore` para não vazar dados de usuários em Git.
- Em produção, mantenha backup periódico desse arquivo ou migre para banco gerenciado.

## Onde editar suas ofertas
Arquivo: `src/data/deals.ts`

Troque:
- `affiliateUrl` para seus links reais de afiliado
- títulos, preços, cupons e categorias

## Rotina recomendada (10 min por dia)
1. Abra `src/data/deals.ts`
2. Atualize 3-5 ofertas com preço atual + cupom
3. Confirme que `affiliateUrl` está com seu ID/parâmetro de afiliado
4. Commit + push
5. Vercel publica automaticamente

## Branding
- Logo principal: `public/logo-lt-radar-label.svg` + `public/logo-mascote-ideias.svg`
- Se quiser trocar o nome/marca, edite:
   - `src/app/layout.tsx`
   - `public/logo-lt-radar-label.svg`
   - `public/logo-mascote-ideias.svg`

## Importante
Siga as políticas de cada programa de afiliado e mantenha o aviso de transparência no site.
