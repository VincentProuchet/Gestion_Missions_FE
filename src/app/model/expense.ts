import { ExpenseType } from "./expense-type";

export interface Expense {
  id: number;
  idMission: number;
  date: Date;
  cost: number;
  tva: number;
  type: ExpenseType;

}
