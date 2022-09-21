import { Injectable } from '@angular/core';
import { Collaborator } from '../model/collaborator';

/**
 * Service collaborator
 * Non utilisé
 * @date 21/09/2022 - 12:12:32
 *
 * @export
 * @class CollaboratorService
 * @typedef {CollaboratorService}
 */
@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private user: Collaborator = {
    id: 0,
    lastName: "",
    firstName: "",
    email: "",
    role: "ROLE_USER",
    manager: null,
  };
  constructor() { }
}
