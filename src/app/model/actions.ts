/**
 * représente des action réalisables
 * par l'utilisateur
 * sur les missions
 * ici on se concentre sur les managers
 */
export enum Actions {
  /** action de valider une mission */
  validate,
  /** action de rejeter une mission */
  reject,
  /** action de remettre une mission au status d'attente de validation */
  reset,
}
