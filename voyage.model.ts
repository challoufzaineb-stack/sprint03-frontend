import { Type } from './type.model';

export class Voyage {
  idVoyage!: number;
  destination!: string;
  prix!: number;
  dateDepart!: Date;
  type!: Type; 
}