import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jwsvubnojesvdieisbft.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  console.log('=== Updating categories ===');

  const catUpdates = [
    { slug: 'vehicules', nom: 'Veículos', nom_pt: 'Veículos', description: 'Carros de empresa, pick-ups, minibus, utilitários' },
    { slug: 'informatique', nom: 'Informática', nom_pt: 'Informática', description: 'PC, servidores, NAS, switches, pontos Wi-Fi' },
    { slug: 'telephonie', nom: 'Telefonia', nom_pt: 'Telefonia', description: 'Smartphones, IPBX, tablets, terminais de pagamento' },
    { slug: 'mobilier', nom: 'Mobiliário', nom_pt: 'Mobiliário', description: 'Mobiliário de escritório, hoteleiro, restaurante, open-space' },
    { slug: 'chr', nom: 'Equipamento CHR', nom_pt: 'Equipamento CHR', description: 'Fornos profissionais, refrigeração, máquinas de café' },
  ];

  for (const cat of catUpdates) {
    const { slug, ...data } = cat;
    const { error } = await supabase.from('categories').update(data).eq('slug', slug);
    console.log(`  ${slug}: ${error ? 'ERROR ' + error.message : 'OK'}`);
  }

  console.log('\n=== Updating products ===');

  const prodUpdates = [
    // Veículos
    { slug: 'toyota-hilux-4x4', nom: 'Toyota Hilux 4×4 Cabine Dupla', description_courte: 'Pick-up robusto ideal para construção civil e ilhas remotas', specifications: { motor: '2.8L Diesel', potencia: '204 cv', transmissao: '4WD', lugares: 5, carga_util: '1000 kg' } },
    { slug: 'mitsubishi-l200', nom: 'Mitsubishi L200 Utilitário', description_courte: 'Utilitário polivalente para empresas de serviços', specifications: { motor: '2.4L Diesel', potencia: '154 cv', transmissao: '4WD', lugares: 5 } },
    { slug: 'minibus-toyota-hiace', nom: 'Toyota HiAce Minibus 15 lugares', description_courte: 'Transporte de pessoal e shuttles hoteleiros', specifications: { lugares: 15, motor: '2.8L Diesel', ar_condicionado: true, uso: 'Transporte coletivo' } },
    // Informática
    { slug: 'dell-latitude-14-pro', nom: 'Dell Latitude 14 Pro (lote 10)', description_courte: 'Pack 10 portáteis profissionais para equipa comercial', specifications: { quantidade: 10, processador: 'Intel Core i5', ram: '16 GB', armazenamento: '512 GB SSD', ecra: '14 polegadas' } },
    { slug: 'serveur-hp-proliant', nom: 'HP ProLiant DL380 Servidor', description_courte: 'Servidor rack de alto desempenho para PME', specifications: { processador: '2x Intel Xeon', ram: '64 GB', armazenamento: '4x 2TB HDD', rack: '2U' } },
    { slug: 'switch-cisco-24ports', nom: 'Cisco Catalyst Switch 24 portas', description_courte: 'Infraestrutura de rede para escritório ou hotel', specifications: { portas: 24, poe: true, velocidade: '1 Gbps', gerenciavel: true } },
    // Telefonia
    { slug: 'iphone-15-pro-lot', nom: 'iPhone 15 Pro (lote 20)', description_courte: 'Frota móvel para equipa comercial ou hoteleira', specifications: { quantidade: 20, armazenamento: '256 GB', cor: 'Titânio natural', garantia: '24 meses' } },
    { slug: 'ipbx-grandstream', nom: 'Central IPBX Grandstream UCM6302', description_courte: 'Central telefónica IP para PME até 100 extensões', specifications: { extensoes_max: 100, extensoes_sip: true, ivr: true, gravacao: true } },
    { slug: 'tablettes-samsung-lot', nom: 'Samsung Galaxy Tab A9 (lote 15)', description_courte: 'Tablets para receção hoteleira ou ponto de venda', specifications: { quantidade: 15, ecra: '10.5 polegadas', armazenamento: '128 GB', wifi: true } },
    // Mobiliário
    { slug: 'agencement-bureau-openspace', nom: 'Open-Space 20 postos de trabalho', description_courte: 'Mobiliário completo para open-space profissional', specifications: { postos: 20, inclui: 'secretárias, gaveteiros, divisórias acústicas, cadeiras ergonómicas', estilo: 'Contemporâneo' } },
    { slug: 'mobilier-chambre-hotel', nom: 'Kit Quarto de Hotel Standard (10 quartos)', description_courte: 'Mobiliário completo para 10 quartos de hotel 3 estrelas', specifications: { quartos: 10, inclui: 'camas, mesas de cabeceira, secretárias, armários, cabeceiras', norma: 'Hotelaria 3 estrelas' } },
    { slug: 'salle-conference', nom: 'Sala de Conferências 20 pessoas', description_courte: 'Mesa oval + cadeirões + ecrã interativo 75 polegadas', specifications: { capacidade: 20, ecra: '75 polegadas 4K', videoconferencia: true, acustica: 'tratamento incluído' } },
    // Equipamento CHR
    { slug: 'four-convection-vapeur', nom: 'Forno de Convecção/Vapor 4 tabuleiros', description_courte: 'Forno profissional convecção/vapor para restaurante', specifications: { tabuleiros: 4, formato: '60x40 cm', alimentacao: '400V', modos: 'Convecção, Vapor, Misto', certificacao: 'CE' } },
    { slug: 'vitrine-refrigeree-morris', nom: 'Vitrina Refrigerada Morris 2.0', description_courte: 'Vitrina refrigerada profissional para pastelaria', specifications: { comprimento: '2 metros', temperatura: '2-8°C', iluminacao: 'LED', niveis: 3, descongelacao: 'Automática' } },
    { slug: 'machine-expresso-3-pistons', nom: 'Máquina de Expresso 3 pistões – 540 chávenas/h', description_courte: 'Máquina de expresso profissional de alto volume', specifications: { capacidade: '540 chávenas/hora', pistoes: 3, limpeza: 'Semiautomática', uso: 'Hotel, Restaurante' } },
    { slug: 'cuisiniere-5-bruleurs', nom: 'Fogão Profissional 5 queimadores a gás', description_courte: 'Fogão a gás 5 queimadores com forno para cozinha profissional', specifications: { queimadores: 5, tipo: 'Gás', forno: 'Integrado', uso: 'Restaurante, Coletividade' } },
  ];

  for (const prod of prodUpdates) {
    const { slug, ...data } = prod;
    const { error } = await supabase.from('produits').update(data).eq('slug', slug);
    console.log(`  ${slug}: ${error ? 'ERROR ' + error.message : 'OK'}`);
  }

  console.log('\n=== Done! ===');
}

run().catch(console.error);
