export class BaseModel {
  id?: string;

  constructor(results: any = {}) {
    this.id = results.id;
  }
}
