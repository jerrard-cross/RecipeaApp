export type FormStep =
  | "basic"
  | "time"
  | "ingredients"
  | "instructions"
  | "additional";

export const STEPS: { id: FormStep; title: string }[] = [
  { id: "basic", title: "Basic Info" },
  { id: "time", title: "Time & Servings" },
  { id: "ingredients", title: "Ingredients" },
  { id: "instructions", title: "Instructions" },
];

// src/constants/recipe.ts
export const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];
export const MEASUREMENTS = [
  "tsp",
  "tbsp",
  "cup",
  "oz",
  "lb",
  "g",
  "kg",
  "ml",
  "l",
  "pt",
  "qt",
  "gal",
  "fl oz",
  "fl pt",
  "fl qt",
  "fl gal",
];
export const CUISINES = [
  "Italian",
  "Chinese",
  "Indian",
  "Mexican",
  "Japanese",
  "Thai",
  "French",
  "Mediterranean",
  "American",
  "Other",
];
