import { BaseModel } from "./BaseModel";
import { IngredientsModel } from "./IngredientsModel";

export class RecipeModel extends BaseModel {
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  image: string;
  rating: number;
  servings: number;
  tags: string[];
  difficulty: string;
  cuisine: string;
  userId?: string;

  constructor(results: any = {}) {
    super();
    this.name = results.name;
    this.ingredients = results.ingredients;
    this.instructions = results.instructions;
    this.prepTimeMinutes = results.prepTimeMinutes;
    this.cookTimeMinutes = results.cookTimeMinutes;
    this.image = results.image;
    this.rating = results.rating;
    this.servings = results.servings;
    this.tags = results.tags;
    this.difficulty = results.difficulty;
    this.cuisine = results.cuisine;
    this.userId = results.userId;
  }
}
