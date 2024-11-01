import { makeAutoObservable, runInAction } from "mobx";
import { RecipeService } from "./api/RecipeService";
import { RootStore } from "./RootStore";
import { RecipeModel } from "../models/RecipeModel";
import { Ingredient } from "../models/IngredientsModel";

const service = new RecipeService();

export class RecipeStore {
  root: RootStore;
  recipes: RecipeModel[] = [];
  selectedRecipe: RecipeModel | null = null;
  recipeDetails: any = {};
  ingredientList: Ingredient[] = [];

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  async getRecipes() {
    const response = await service.getRecipes();

    if (response) {
      console.log(response);
      runInAction(() => {
        this.recipes = response ?? [];
      });
    }
  }

  async createRecipe(recipe: RecipeModel) {
    console.log(recipe, this.root.auth.user?.Id);
    try {
      const response = await service.createRecipe(recipe);
      if (response) {
        console.log(response);
        runInAction(() => {
          this.recipes.push(...response);
        });
        return;
      } else {
        console.error("Error creating recipe");
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  }

  async getIngredientList() {
    const response = await service.getIngredientList();

    if (response) {
      console.log(response);
      runInAction(() => {
        this.ingredientList = response ?? [];
      });
    }
  }

  selectRecipe(recipe: RecipeModel) {
    runInAction(() => {
      this.selectedRecipe = recipe;
    });
  }
}
