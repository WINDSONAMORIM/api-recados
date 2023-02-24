import { randomUUID } from "crypto";

export interface RecadoDTO {
  description: string;
  detail: string;
}

export class Recado {
  id: string;
  description: string;
  detail: string;

  constructor(params: RecadoDTO) {
    this.id = randomUUID();
    this.description = params.description;
    this.detail = params.detail;
  }
}
