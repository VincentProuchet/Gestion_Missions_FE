import { ExpenseType } from "./expense-type";
/**
 * Lignes de frais,
 */
export interface Expense {
  /**identifiant */
  id: number;
  /** identifiant de la mission à lauqelle est rattaché la ligne de frais */
  idMission: number;
  /** date du frais */
  date: Date;
  /** valeur */
  cost: number;
  /** taux de TVA */
  tva: number;
  /** type de Frais */
  type: ExpenseType;

}
