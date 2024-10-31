import { BaseModel } from "./BaseModel";

export class IngredientsModel extends BaseModel {
  ingredient: Ingredient;
  amount: string;
  measurement_type: MeasurementType;

  constructor(results: any = {}) {
    super();
    this.ingredient = results.Ingredient;
    this.amount = results.Amount;
    this.measurement_type = results.measurement_type;
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
