import { Role } from "./role";

/**
 *  Strucutre des données pour le travail des service et la communication avec l'API
 */
export interface Collaborator {
  /** identifiant du collaborateur */
  id: number;
  /** Nom */
  lastName: string;
  /** Prenom */
  firstName: string;
  /** Username */
  username: String;
  /** email */
  email: string;
  /** Role */
  roles: Role[];
  /**
   * tous les Manager auront un id à 0
   * puisque me manager n'est pas une valeur de controle coté FE
   * et qu'il est inutile d'exposer la valeur à un utilisateur
   */
  manager: Collaborator | null;

}
