import { BaseModel } from "./BaseModel";
import { IngredientsModel } from "./IngredientsModel";

export class RecipeModel extends BaseModel {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  mealType: string[];
  image: string;
  rating: number;
  servings: number;
  tags: string[];
  cuisine: string;
  userId?: string;

  constructor(results: any = {}) {
    super();
    this.name = results.Name;
    this.description = results.Description;
    this.ingredients = results.Ingredients;
    this.instructions = results.Instructions;
    this.prepTimeMinutes = results.PrepTimeMinutes;
    this.cookTimeMinutes = results.CookTimeMinutes;
    this.mealType = results.MealType;
    this.image = results.Image;
    this.rating = results.Rating;
    this.servings = results.Servings;
    this.tags = results.Tags;
    this.cuisine = results.Cuisine;
    this.userId = results.UserId;
  }
}
