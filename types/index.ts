export interface Category {
  id: string;
  slug: string;
  nom: string;
  nom_pt: string | null;
  description: string | null;
  icone: string | null;
  image_url: string | null;
  commission_min: number;
  commission_max: number;
  ordre: number;
  actif: boolean;
  created_at: string;
}

export interface Produit {
  id: string;
  categorie_id: string;
  slug: string;
  nom: string;
  marque: string | null;
  modele: string | null;
  description: string | null;
  description_courte: string | null;
  prix_achat: number;
  valeur_residuelle_pct: number;
  durees_disponibles: number[];
  images: string[] | null;
  specifications: Record<string, string | number | boolean> | null;
  tags: string[] | null;
  en_vedette: boolean;
  actif: boolean;
  stock_disponible: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category;
}

export interface Profil {
  id: string;
  prenom: string | null;
  nom: string | null;
  telephone: string | null;
  type_client: 'entreprise' | 'profession_liberale' | 'administration' | 'particulier_pro' | null;
  nom_entreprise: string | null;
  siret: string | null;
  secteur: string | null;
  role: 'client' | 'admin' | 'banque';
  created_at: string;
}

export interface Demande {
  id: string;
  reference: string;
  utilisateur_id: string | null;
  produit_id: string | null;
  prix_bien: number;
  duree_mois: number;
  loyer_mensuel_estime: number;
  valeur_residuelle: number | null;
  taux_commission: number | null;
  client_prenom: string | null;
  client_nom: string | null;
  client_email: string;
  client_telephone: string | null;
  client_type: string | null;
  client_nom_entreprise: string | null;
  client_siret: string | null;
  client_secteur: string | null;
  client_ile: string | null;
  fournisseur_souhaite: string | null;
  statut: 'nouvelle' | 'en_etude' | 'approuvee' | 'refusee' | 'en_cours' | 'terminee' | 'annulee';
  documents_urls: string[] | null;
  notes_admin: string | null;
  banque_partenaire: string | null;
  created_at: string;
  updated_at: string;
  produits?: Produit;
}

export interface Simulation {
  id: string;
  utilisateur_id: string | null;
  produit_id: string | null;
  prix_bien: number | null;
  duree_mois: number | null;
  loyer_mensuel: number | null;
  session_id: string | null;
  created_at: string;
}

export const ILES_CAP_VERT = [
  'Santiago', 'Sal', 'Boavista', 'São Vicente', 'Fogo',
  'Santo Antão', 'Maio', 'Brava', 'São Nicolau', 'Santa Luzia'
] as const;

export type IleCapVert = typeof ILES_CAP_VERT[number];

export const STATUT_LABELS: Record<Demande['statut'], string> = {
  nouvelle: 'Nouvelle',
  en_etude: 'En étude',
  approuvee: 'Approuvée',
  refusee: 'Refusée',
  en_cours: 'En cours',
  terminee: 'Terminée',
  annulee: 'Annulée',
};

export const STATUT_COLORS: Record<Demande['statut'], string> = {
  nouvelle: 'bg-blue-100 text-blue-800',
  en_etude: 'bg-yellow-100 text-yellow-800',
  approuvee: 'bg-green-100 text-green-800',
  refusee: 'bg-red-100 text-red-800',
  en_cours: 'bg-teal-100 text-teal-800',
  terminee: 'bg-gray-100 text-gray-800',
  annulee: 'bg-gray-100 text-gray-500',
};
