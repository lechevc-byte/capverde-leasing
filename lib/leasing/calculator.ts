export interface LeasingConfig {
  prixBien: number;
  dureeMois: number;
  valeurResiduellePct: number;
  tauxAnnuel?: number;
}

export interface LeasingResult {
  loyerMensuel: number;
  loyerTotal: number;
  valeurResiduelle: number;
  coutTotal: number;
  coutFinancement: number;
  economieImpot: number;
  tauxEffectif: number;
}

export function calculerLeasing(config: LeasingConfig): LeasingResult {
  const {
    prixBien,
    dureeMois,
    valeurResiduellePct = 5,
    tauxAnnuel = 8,
  } = config;

  const tauxMensuel = tauxAnnuel / 100 / 12;
  const valeurResiduelle = prixBien * (valeurResiduellePct / 100);
  const montantFinance = prixBien - valeurResiduelle;

  const loyerMensuel =
    tauxMensuel === 0
      ? montantFinance / dureeMois
      : (montantFinance * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -dureeMois));

  const loyerMensuelArrondi = Math.round(loyerMensuel);
  const loyerTotal = loyerMensuelArrondi * dureeMois;
  const coutTotal = loyerTotal + Math.round(valeurResiduelle);
  const coutFinancement = coutTotal - prixBien;
  const economieImpot = loyerTotal * 0.28;
  const tauxEffectif = tauxAnnuel;

  return {
    loyerMensuel: loyerMensuelArrondi,
    loyerTotal: Math.round(loyerTotal),
    valeurResiduelle: Math.round(valeurResiduelle),
    coutTotal: Math.round(coutTotal),
    coutFinancement: Math.round(coutFinancement),
    economieImpot: Math.round(economieImpot),
    tauxEffectif,
  };
}

export function loyerMinimum(prixBien: number, valeurResiduellePct = 5): number {
  const result = calculerLeasing({ prixBien, dureeMois: 60, valeurResiduellePct });
  return result.loyerMensuel;
}
