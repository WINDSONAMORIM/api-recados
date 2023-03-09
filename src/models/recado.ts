import { randomUUID } from "crypto";

export interface RecadoDTO {
  description: string;
  detail: string;
  archive: boolean;
}

export class Recado {
  id: string;
  description: string;
  detail: string;
  archive: boolean;

  constructor(params: RecadoDTO) {
    this.id = randomUUID();
    this.description = params.description;
    this.detail = params.detail;
    this.archive = false;
  }
}
