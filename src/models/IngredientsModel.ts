import { BaseModel } from "./BaseModel";

export class IngredientsModel {
  id: string;
  amount: string;
  unit: string;
  name: string;
  notes?: string;

  constructor(results: any = {}) {
    this.id = results.id;
    this.amount = results.amount;
    this.unit = results.unit;
    this.name = results.name;
    this.notes = results.notes;
  }
}

export class Ingredient extends BaseModel {
  name: string;
  type: string;

  constructor(results: any = {}) {
    super();
    this.name = results.name;
    this.type = results.type;
  }
}

export class MeasurementType extends BaseModel {
  name: string;
  abbreviation: string;

  constructor(results: any = {}) {
    super();
    this.name = results.name;
    this.abbreviation = results.abbreviation;
  }
}
