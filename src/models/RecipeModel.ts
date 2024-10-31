import { BaseModel } from "./BaseModel";
import { IngredientsModel } from "./IngredientsModel";

export class RecipeModel extends BaseModel {
  name: string;
  description: string;
  ingredients: IngredientsModel[];
  instructions: string;
  image: string;
  category: string;
  time: string;
  servings: string;
  user_id?: string;

  constructor(results: any = {}) {
    super();
    this.name = results.name ?? "";
    this.description = results.description ?? "";
    this.ingredients = results.ingredients ?? [];
    this.instructions = results.instructions ?? "";
    this.image = results.image ?? "";
    this.category = results.category ?? "";
    this.time = results.time ?? "";
    this.servings = results.servings ?? "";
    this.user_id = results.user_id ?? "";
  }
}
