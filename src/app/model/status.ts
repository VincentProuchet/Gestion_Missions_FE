/**
 * status pour les missions
 */
export enum Status {
  /** the mission is just created and in a state where only its creator can touch it */
  INIT = 0,
  /**the management validated the mission */
  VALIDATED = 1,
  /** the management rejected the mission */
  REJECTED = 2,
  /** the mission is available to management for decision */
  WAITING_VALIDATION = 3
}
