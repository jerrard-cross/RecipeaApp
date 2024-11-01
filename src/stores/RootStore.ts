import { AuthStore } from "./AuthStore";
import { RecipeStore } from "./RecipeStore";
import { UIStore } from "./UIStore";

export class RootStore {
  ui: UIStore;
  auth: AuthStore;
  recipes: RecipeStore;

  constructor() {
    this.ui = new UIStore(this);
    this.auth = new AuthStore(this);
    this.recipes = new RecipeStore(this);
  }

  showToast(props: any) {
    this.ui.showToast(props);
  }

  showModal(props: any) {
    this.ui.showModal(props);
  }

  hideModal() {
    this.ui.hideModal();
  }
}
