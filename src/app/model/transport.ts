/**
 * type de transport
 * pour les missions
 */
export enum Transport {
  Flight // attention les transport en Aériens
  // neccesite un controle sur la date de début de la Mission
  // startDate == thisDay.date + 7d
  , Car
  , Train
  , Carshare
}
