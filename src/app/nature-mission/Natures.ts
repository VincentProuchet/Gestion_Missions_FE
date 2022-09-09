export class Nature {
  constructor (
    public id: number,
    public nom: string,
    public facturation: boolean,
    public tjm: string,
    public prime: boolean,
    public pourcentage: number,
    public dateDebut: Date,
    public dateFin: Date
  ){}
}
