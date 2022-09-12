/**
 * Nature de missions
 */
export interface Nature {
  /** identifiant nature */
  id: number | null;
  /** libellé */
  description: string;
  /** date début de validité
   * le type any est utilisé pour le dev parce que ça part dans tous
   * les sens
   */
  dateOfValidity: Date;
  /** date de fin, une valeur nulle indique
   * une nature en cours de validité
   * le type any est utilisé pour le dev parce que ça part dans tous
   * les sens
   */
  endOfValidity: Date | null;
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
