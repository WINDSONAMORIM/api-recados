import { randomUUID } from "crypto";
import { Recado } from "./recado";

export interface UserDTO {
  name: string;
  email: string;
  password: string;
}

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  recados: Recado[];

  constructor(params: UserDTO) {
    this.id = randomUUID();
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
    this.recados = [];
  }
}
