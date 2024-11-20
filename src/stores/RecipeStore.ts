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
  filteredRecipes: RecipeModel[] = [];

  selectedTags: string[] = [];

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  async getRecipes() {
    const response = await service.getRecipes();

    if (response) {
      runInAction(() => {
        this.recipes = response ?? [];
        this.filteredRecipes = this.recipes;
      });
    }
  }

  async searchRecipes(searchTerm: string) {
    runInAction(() => {
      this.filteredRecipes = this.filteredRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  async createRecipe(recipe: RecipeModel) {
    runInAction(() => {
      this.recipes.push(new RecipeModel(recipe));
    });
  }

  async updateRecipe(recipe: RecipeModel) {
    runInAction(() => {
      const index = this.recipes.findIndex((r) => r.id === recipe.id);
      this.recipes[index] = recipe;
      this.selectedRecipe = recipe;
    });
  }

  async getIngredientList() {
    const response = await service.getIngredientList();

    if (response) {
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

  setSelectedTags(tags: string[]) {
    runInAction(() => {
      this.selectedTags = tags;
      this.filteredRecipes = this.recipes.filter((recipe) => {
        if (tags.length === 0) return true;

        return tags.some((tag) => recipe.cuisine.includes(tag));
      });
    });
  }
}
