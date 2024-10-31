export interface Ingredient {
  id: string;
  name: string;
  type: string;
}

export interface SelectedIngredient extends Ingredient {
  amount: string;
  unit: string;
}

export interface NewIngredient {
  name: string;
  type: string;
}

// constants.ts
export const UNITS = [
  "grams",
  "kg",
  "ml",
  "liters",
  "cups",
  "tablespoons",
  "teaspoons",
  "pieces",
  "whole",
  "to taste",
] as const;

export type Unit = (typeof UNITS)[number];
