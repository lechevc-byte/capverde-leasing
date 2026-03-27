-- ═══════════════════════════════════════════════════
-- CATÉGORIES
-- ═══════════════════════════════════════════════════
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  nom_pt TEXT,
  description TEXT,
  icone TEXT,
  image_url TEXT,
  commission_min DECIMAL(4,2) DEFAULT 5.0,
  commission_max DECIMAL(4,2) DEFAULT 8.0,
  ordre INTEGER DEFAULT 0,
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO categories (slug, nom, nom_pt, description, icone, commission_min, commission_max, ordre) VALUES
  ('vehicules',    'Véhicules',     'Veículos',    'Voitures de société, pick-ups, minibus, utilitaires', '🚗', 5.0, 6.0, 1),
  ('informatique', 'Informatique',  'Informática', 'PC, serveurs, NAS, switches, bornes Wi-Fi',           '💻', 6.0, 7.0, 2),
  ('telephonie',   'Téléphonie',    'Telefonia',   'Smartphones, IPBX, tablettes, terminaux paiement',   '📱', 6.0, 8.0, 3),
  ('mobilier',     'Mobilier',      'Mobiliário',  'Mobilier bureau, hôtelier, restaurant, open-space',   '🪑', 5.0, 7.0, 4),
  ('chr',          'Matériel CHR',  'Equipamentos CHR', 'Fours pro, réfrigération, machines café, hottes', '🍽️', 6.0, 8.0, 5);

-- ═══════════════════════════════════════════════════
-- PRODUITS
-- ═══════════════════════════════════════════════════
CREATE TABLE produits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categorie_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  marque TEXT,
  modele TEXT,
  description TEXT,
  description_courte TEXT,
  prix_achat DECIMAL(12,2) NOT NULL,
  valeur_residuelle_pct DECIMAL(4,2) DEFAULT 5.0,
  durees_disponibles INTEGER[] DEFAULT '{24,36,48,60}',
  images TEXT[],
  specifications JSONB,
  tags TEXT[],
  en_vedette BOOLEAN DEFAULT false,
  actif BOOLEAN DEFAULT true,
  stock_disponible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════
-- PROFILS UTILISATEURS (étend auth.users)
-- ═══════════════════════════════════════════════════
CREATE TABLE profils (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  prenom TEXT,
  nom TEXT,
  telephone TEXT,
  type_client TEXT CHECK (type_client IN ('entreprise','profession_liberale','administration','particulier_pro')),
  nom_entreprise TEXT,
  siret TEXT,
  secteur TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client','admin','banque')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════
-- DEMANDES DE LEASING
-- ═══════════════════════════════════════════════════
CREATE TABLE demandes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT UNIQUE NOT NULL,
  utilisateur_id UUID REFERENCES profils(id),
  produit_id UUID REFERENCES produits(id),
  prix_bien DECIMAL(12,2) NOT NULL,
  duree_mois INTEGER NOT NULL CHECK (duree_mois IN (24,36,48,60)),
  loyer_mensuel_estime DECIMAL(10,2) NOT NULL,
  valeur_residuelle DECIMAL(10,2),
  taux_commission DECIMAL(4,2),
  client_prenom TEXT,
  client_nom TEXT,
  client_email TEXT NOT NULL,
  client_telephone TEXT,
  client_type TEXT,
  client_nom_entreprise TEXT,
  client_siret TEXT,
  client_secteur TEXT,
  client_ile TEXT,
  fournisseur_souhaite TEXT,
  statut TEXT DEFAULT 'nouvelle' CHECK (statut IN (
    'nouvelle','en_etude','approuvee','refusee','en_cours','terminee','annulee'
  )),
  documents_urls TEXT[],
  notes_admin TEXT,
  banque_partenaire TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE SEQUENCE demandes_reference_seq START 1;

CREATE OR REPLACE FUNCTION generate_reference()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reference := 'CVL-' || EXTRACT(YEAR FROM now()) || '-' || LPAD(nextval('demandes_reference_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_reference
  BEFORE INSERT ON demandes
  FOR EACH ROW EXECUTE FUNCTION generate_reference();

-- ═══════════════════════════════════════════════════
-- SIMULATIONS
-- ═══════════════════════════════════════════════════
CREATE TABLE simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  utilisateur_id UUID REFERENCES profils(id),
  produit_id UUID REFERENCES produits(id),
  prix_bien DECIMAL(12,2),
  duree_mois INTEGER,
  loyer_mensuel DECIMAL(10,2),
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════
ALTER TABLE profils ENABLE ROW LEVEL SECURITY;
ALTER TABLE demandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE produits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profil_self" ON profils FOR ALL USING (auth.uid() = id);

CREATE POLICY "demandes_owner" ON demandes FOR SELECT USING (
  auth.uid() = utilisateur_id OR
  EXISTS (SELECT 1 FROM profils WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "demandes_insert" ON demandes FOR INSERT WITH CHECK (true);
CREATE POLICY "demandes_update_admin" ON demandes FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profils WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "categories_public_read" ON categories FOR SELECT USING (actif = true);
CREATE POLICY "produits_public_read" ON produits FOR SELECT USING (actif = true);

-- ═══════════════════════════════════════════════════
-- DONNÉES DE TEST
-- ═══════════════════════════════════════════════════

-- Véhicules
INSERT INTO produits (categorie_id, slug, nom, marque, modele, description_courte, prix_achat, durees_disponibles, en_vedette, specifications) VALUES
  ((SELECT id FROM categories WHERE slug='vehicules'), 'toyota-hilux-4x4', 'Toyota Hilux 4×4 Double Cabine', 'Toyota', 'Hilux', 'Pick-up robuste idéal pour le BTP et les îles reculées', 42000, '{24,36,48,60}', true,
   '{"moteur":"2.8L Diesel","puissance":"204 ch","transmission":"4WD","places":5,"charge_utile":"1000 kg"}'),
  ((SELECT id FROM categories WHERE slug='vehicules'), 'mitsubishi-l200', 'Mitsubishi L200 Utilitaire', 'Mitsubishi', 'L200', 'Utilitaire polyvalent pour sociétés de services', 35000, '{24,36,48,60}', false,
   '{"moteur":"2.4L Diesel","puissance":"154 ch","transmission":"4WD","places":5}'),
  ((SELECT id FROM categories WHERE slug='vehicules'), 'minibus-toyota-hiace', 'Toyota HiAce Minibus 15 places', 'Toyota', 'HiAce', 'Transport de personnels, navettes hôtelières', 55000, '{36,48,60}', true,
   '{"places":15,"moteur":"2.8L Diesel","climatisation":true,"usage":"Transport collectif"}');

-- Informatique
INSERT INTO produits (categorie_id, slug, nom, marque, modele, description_courte, prix_achat, durees_disponibles, en_vedette, specifications) VALUES
  ((SELECT id FROM categories WHERE slug='informatique'), 'dell-latitude-14-pro', 'Dell Latitude 14 Pro (lot 10)', 'Dell', 'Latitude 14', 'Pack 10 laptops professionnels pour équipe commerciale', 12000, '{24,36,48}', true,
   '{"quantite":10,"processeur":"Intel Core i5","ram":"16 Go","stockage":"512 Go SSD","ecran":"14 pouces"}'),
  ((SELECT id FROM categories WHERE slug='informatique'), 'serveur-hp-proliant', 'HP ProLiant DL380 Serveur', 'HP', 'ProLiant DL380', 'Serveur rack haute performance pour PME', 18000, '{36,48,60}', false,
   '{"processeur":"2x Intel Xeon","ram":"64 Go","stockage":"4x 2To HDD","baie":"2U rack"}'),
  ((SELECT id FROM categories WHERE slug='informatique'), 'switch-cisco-24ports', 'Cisco Catalyst Switch 24 ports', 'Cisco', 'Catalyst 2960', 'Infrastructure réseau pour bureau ou hôtel', 8500, '{24,36,48}', false,
   '{"ports":24,"poe":true,"vitesse":"1 Gbps","manageable":true}');

-- Téléphonie
INSERT INTO produits (categorie_id, slug, nom, marque, modele, description_courte, prix_achat, durees_disponibles, en_vedette, specifications) VALUES
  ((SELECT id FROM categories WHERE slug='telephonie'), 'iphone-15-pro-lot', 'iPhone 15 Pro (lot 20)', 'Apple', 'iPhone 15 Pro', 'Fleet mobile pour équipe commerciale ou hôtelière', 28000, '{24,36}', true,
   '{"quantite":20,"stockage":"256 Go","couleur":"Titane naturel","garantie":"24 mois"}'),
  ((SELECT id FROM categories WHERE slug='telephonie'), 'ipbx-grandstream', 'Centrale IPBX Grandstream UCM6302', 'Grandstream', 'UCM6302', 'Centrale téléphonique IP pour PME jusqu à 100 postes', 4500, '{24,36,48}', false,
   '{"postes_max":100,"extensions_sip":true,"ivr":true,"enregistrement":true}'),
  ((SELECT id FROM categories WHERE slug='telephonie'), 'tablettes-samsung-lot', 'Samsung Galaxy Tab A9 (lot 15)', 'Samsung', 'Galaxy Tab A9', 'Tablettes pour réception hôtelière ou point de vente', 9000, '{24,36}', false,
   '{"quantite":15,"ecran":"10.5 pouces","stockage":"128 Go","wifi":true,"4g":true}');

-- Mobilier
INSERT INTO produits (categorie_id, slug, nom, marque, modele, description_courte, prix_achat, durees_disponibles, en_vedette, specifications) VALUES
  ((SELECT id FROM categories WHERE slug='mobilier'), 'agencement-bureau-openspace', 'Agencement Open-Space 20 postes', 'Kinnarps', 'Suite Pro', 'Mobilier complet pour open-space professionnel', 22000, '{36,48,60}', true,
   '{"postes":20,"inclus":"bureaux, caissons, cloisons acoustiques, chaises ergonomiques","style":"Contemporain"}'),
  ((SELECT id FROM categories WHERE slug='mobilier'), 'mobilier-chambre-hotel', 'Kit Chambre Hôtelière Standard (10 chambres)', 'Custom', 'Hotel Line', 'Mobilier complet pour 10 chambres hôtelières 3 étoiles', 35000, '{36,48,60}', true,
   '{"chambres":10,"inclus":"lits, chevets, bureaux, armoires, têtes de lit","norme":"NF Hôtellerie"}'),
  ((SELECT id FROM categories WHERE slug='mobilier'), 'salle-conference', 'Salle de Conférence 20 personnes', 'Steelcase', 'Meeting Pro', 'Table ovale + fauteuils + écran interactif 75 pouces', 18000, '{36,48}', false,
   '{"capacite":20,"ecran":"75 pouces 4K","visioconference":true,"acoustique":"traitement compris"}');

-- Matériel CHR
INSERT INTO produits (categorie_id, slug, nom, marque, modele, description_courte, prix_achat, durees_disponibles, en_vedette, images, specifications) VALUES
  ((SELECT id FROM categories WHERE slug='chr'), 'four-convection-vapeur', 'Four à Convection / Vapeur 4 plateaux', 'Leasymat', 'CV-4GN', 'Four professionnel convection/vapeur pour restaurant', 684, '{24,36,48}', true,
   ARRAY['https://leasymat.com/wp-content/uploads/2025/04/sp-005-61656e68b2750.jpg'],
   '{"plateaux":4,"format":"60x40 cm","alimentation":"400V","modes":"Convection, Vapeur, Mixte","certif":"CE"}'),
  ((SELECT id FROM categories WHERE slug='chr'), 'vitrine-refrigeree-morris', 'Vitrine Réfrigérée Morris 2.0', 'Leasymat', 'Morris 2.0', 'Vitrine réfrigérée professionnelle pour boulangerie-pâtisserie', 2338, '{24,36,48}', false,
   ARRAY['https://leasymat.com/wp-content/uploads/2025/04/7486.0075-9556-scaled.jpg'],
   '{"longueur":"2 mètres","temperature":"2-8°C","eclairage":"LED","niveaux":3,"degivrage":"Automatique"}'),
  ((SELECT id FROM categories WHERE slug='chr'), 'machine-expresso-3-pistons', 'Machine à Expresso 3 pistons – 540 tasses/h', 'Leasymat', 'EX-3P', 'Machine expresso professionnelle haut volume pour hôtel ou restaurant', 2069, '{24,36,48}', true,
   ARRAY['https://leasymat.com/wp-content/uploads/2025/04/sp-1005-09100003.jpg'],
   '{"capacite":"540 tasses/heure","pistons":3,"nettoyage":"Semi-automatique","usage":"Hôtel, Restaurant"}'),
  ((SELECT id FROM categories WHERE slug='chr'), 'cuisiniere-5-bruleurs', 'Cuisinière Professionnelle 5 brûleurs gaz', 'Leasymat', 'CUI-5BR', 'Cuisinière gaz 5 feux avec four pour cuisine professionnelle', 3575, '{24,36,48}', true,
   ARRAY['https://leasymat.com/wp-content/uploads/2025/04/7003.0920-9888.jpg'],
   '{"bruleurs":5,"type":"Gaz","four":"Intégré","usage":"Restaurant, Collectivité"}');
