import React from "react";
import { RootStore } from "./RootStore";

const root = new RootStore();

export const AuthStoreContext = React.createContext(root.auth);
export const useAuthStore = () => React.useContext(AuthStoreContext);

export const RecipeStoreContext = React.createContext(root.recipes);
export const useRecipeStore = () => React.useContext(RecipeStoreContext);

export const PermissionStoreContext = React.createContext(root.permission);
export const usePermissionStore = () =>
  React.useContext(PermissionStoreContext);
