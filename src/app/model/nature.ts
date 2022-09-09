/**
 * Nature de missions
 */
export interface Nature {
  /** identifiant nature */
  id: number;
  /** libellé */
  description: string;
  /** date début de validité */
  dateOfValidity: Date;
  /** date de fin, une valeur nulle indique
   * une nature en cours de validité
   */
  endOfValidity: Date;
  /**
   * est-ce que la nature
   * donne un bonus
   */
  givesBonus: boolean;
  /**
   * est-ce que la nature est facturée
   */
  charged: boolean;
  /**
   * valeur de facturation
   * à multiplier par la durée de la mission
   */
  tjm: number
  /**
   * pourcentage pour la calcul des bonus
   */
  bonusPercentage: number;
}
