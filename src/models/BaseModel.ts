export class BaseModel {
  id?: string;
  created_at?: string;

  constructor(results: any = {}) {
    this.id = results.id;
    this.created_at = results.created_at;
  }
}
