export interface Nature {
  id: number;
  description: string;
  dateOfValidity: Date;
  endOfValidity: Date;
  givesBonus: boolean;
  charged: boolean;
  tjm: number
  bonusPercentage: number;
}
