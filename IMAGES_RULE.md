# RÈGLE IMAGES — NE JAMAIS MODIFIER SANS LIRE CECI

## Configuration
- `images: { unoptimized: true }` dans next.config.mjs → NE PAS TOUCHER
- Raison : quota Vercel Free (1000 req/mois) atteint → 402 PAYMENT_REQUIRED

## Composant obligatoire
- Toujours utiliser `<ProductImage>` (components/products/ProductImage.tsx)
- JAMAIS de `<Image>` ou `<img>` inline pour les images produits
- Ce composant gère : affichage, fallback icône, erreur réseau

## Sources d'images autorisées
- Unsplash : https://images.unsplash.com/... (avec ?w=800&h=600&fit=crop)
- Supabase : https://jwsvubnojesvdieisbft.supabase.co/...

## Si les images cassent à nouveau
1. Vérifier que unoptimized: true est toujours dans next.config.mjs
2. Vérifier que <ProductImage> est utilisé (pas <Image> inline)
3. Vérifier que l'URL en base est complète (https://...)
