import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jwsvubnojesvdieisbft.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 1 EUR = 110.265 CVE (taux fixe)
const EUR_TO_CVE = 110.265;
const eur = (e) => Math.round(e * EUR_TO_CVE);

async function run() {
  console.log('=== Updating products: CVE prices + unit quantities ===\n');

  const prodUpdates = [
    // Veículos (prix inchangés, juste conversion)
    { slug: 'toyota-hilux-4x4', prix_achat: eur(42000) },
    { slug: 'mitsubishi-l200', prix_achat: eur(35000) },
    { slug: 'minibus-toyota-hiace', prix_achat: eur(55000) },

    // Informática — Dell: 12000/10 = 1200 EUR par unité
    {
      slug: 'dell-latitude-14-pro',
      nom: 'Dell Latitude 14 Pro',
      description_courte: 'Portátil profissional para uso empresarial',
      prix_achat: eur(1200),
      specifications: { processador: 'Intel Core i5', ram: '16 GB', armazenamento: '512 GB SSD', ecra: '14 polegadas' },
    },
    { slug: 'serveur-hp-proliant', prix_achat: eur(18000) },
    { slug: 'switch-cisco-24ports', prix_achat: eur(8500) },

    // Telefonia — iPhone: 28000/20 = 1400 EUR par unité
    {
      slug: 'iphone-15-pro-lot',
      nom: 'iPhone 15 Pro',
      description_courte: 'Smartphone profissional para uso empresarial ou hoteleiro',
      prix_achat: eur(1400),
      specifications: { armazenamento: '256 GB', cor: 'Titânio natural', garantia: '24 meses' },
    },
    { slug: 'ipbx-grandstream', prix_achat: eur(4500) },
    // Samsung Tab: 9000/15 = 600 EUR par unité
    {
      slug: 'tablettes-samsung-lot',
      nom: 'Samsung Galaxy Tab A9',
      description_courte: 'Tablet para receção hoteleira ou ponto de venda',
      prix_achat: eur(600),
      specifications: { ecra: '10.5 polegadas', armazenamento: '128 GB', wifi: true },
    },

    // Mobiliário — Open-Space: 22000/20 = 1100 EUR par poste
    {
      slug: 'agencement-bureau-openspace',
      nom: 'Posto de trabalho Open-Space',
      description_courte: 'Mobiliário completo para 1 posto de trabalho profissional',
      prix_achat: eur(1100),
      specifications: { inclui: 'secretária, gaveteiro, divisória acústica, cadeira ergonómica', estilo: 'Contemporâneo' },
    },
    // Hotel: 35000/10 = 3500 EUR par chambre
    {
      slug: 'mobilier-chambre-hotel',
      nom: 'Kit Quarto de Hotel Standard',
      description_courte: 'Mobiliário completo para 1 quarto de hotel 3 estrelas',
      prix_achat: eur(3500),
      specifications: { inclui: 'cama, mesa de cabeceira, secretária, armário, cabeceira', norma: 'Hotelaria 3 estrelas' },
    },
    { slug: 'salle-conference', prix_achat: eur(18000) },

    // Equipamento CHR
    { slug: 'four-convection-vapeur', prix_achat: eur(684) },
    { slug: 'vitrine-refrigeree-morris', prix_achat: eur(2338) },
    { slug: 'machine-expresso-3-pistons', prix_achat: eur(2069) },
    { slug: 'cuisiniere-5-bruleurs', prix_achat: eur(3575) },
  ];

  for (const prod of prodUpdates) {
    const { slug, ...data } = prod;
    const { error } = await supabase.from('produits').update(data).eq('slug', slug);
    console.log(`  ${slug}: ${error ? 'ERROR ' + error.message : 'OK'} (${data.prix_achat} CVE)`);
  }

  console.log('\n=== Done! ===');
}

run().catch(console.error);
