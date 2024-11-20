import { mapResponseToArray, mapResponseToInstance } from "@/src/lib/maps";
import { supabase } from "@/src/lib/supabase";
import {
  Ingredient,
  IngredientsModel,
  MeasurementType,
} from "@/src/models/IngredientsModel";
import { RecipeModel } from "@/src/models/RecipeModel";
import { BaseService } from "./BaseService";

export class RecipeService extends BaseService {
  // Recipes
  async getRecipes() {
    //Dummy data
    let { data }: { data: { recipes: RecipeModel[] } } = await this.get(
      "/recipes?limit=10"
    );
    return data.recipes.map((recipe: RecipeModel) => new RecipeModel(recipe));

    // Supabase setup
    // return supabase
    //   .from("recipes")
    //   .select()
    //   .eq("user_id", userId)
    //   .then(mapResponseToArray(RecipeModel));
  }

  async createRecipe(recipe: RecipeModel) {
    const { data, error } = await supabase
      .from("recipes")
      .insert([recipe])
      .select();

    if (error) {
      console.error("Error creating recipe:", error.message);
    }
    return mapResponseToArray(RecipeModel)(data);
  }

  async updateRecipe(recipe: RecipeModel) {
    return supabase.from("recipes").update(recipe).eq("id", recipe.id);
  }

  async deleteRecipe(recipeId: string) {
    return supabase.from("recipes").delete().eq("id", recipeId);
  }

  // Recipe Ingredients

  async getIngredients(recipeId: string) {
    return supabase
      .from("ingredients")
      .select()
      .eq("recipe_id", recipeId)
      .then(mapResponseToArray(IngredientsModel));
  }

  async createIngredient(ingredient: IngredientsModel) {
    const { data, error } = await supabase
      .from("ingredients")
      .insert([ingredient])
      .select();

    if (error) {
      console.error("Error creating ingredient:", error.message);
    }
    return mapResponseToArray(IngredientsModel)(data);
  }

  async updateIngredient(ingredient: IngredientsModel) {
    return supabase
      .from("ingredients")
      .update(ingredient)
      .eq("id", ingredient.id);
  }

  async deleteIngredient(ingredientId: string) {
    return supabase.from("ingredients").delete().eq("id", ingredientId);
  }

  // Ingredient List
  async getIngredientList() {
    return supabase
      .from("ingredient")
      .select()
      .then(mapResponseToArray(Ingredient));
  }

  // Measurement Types
  async getMeasurementTypes() {
    return supabase
      .from("measurement_types")
      .select()
      .then(mapResponseToArray(MeasurementType));
  }

  async createMeasurementType(measurementType: MeasurementType) {
    const { data, error } = await supabase
      .from("measurement_types")
      .insert([measurementType])
      .select();

    if (error) {
      console.error("Error creating measurement type:", error.message);
    }
    return mapResponseToArray(MeasurementType)(data);
  }

  async updateMeasurementType(measurementType: MeasurementType) {
    return supabase
      .from("measurement_types")
      .update(measurementType)
      .eq("id", measurementType.id);
  }

  async deleteMeasurementType(measurementTypeId: string) {
    return supabase
      .from("measurement_types")
      .delete()
      .eq("id", measurementTypeId);
  }

  //
}
