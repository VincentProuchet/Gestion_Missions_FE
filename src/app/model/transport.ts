/**
 * type de transport
 * pour les missions
 */
export enum Transport {
  Flight = "aérien" // attention les transport en Aériens
  // neccesite un controle sur la date de début de la Mission
  // startDate == thisDay.date + 7d
  , Car = "voiture"
  , Train = "train"
  , Carshare = "covoiturage"
}
