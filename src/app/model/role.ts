export type RoleUnion = "ADMINISTRATOR" | "MANAGER" | "COLLABORATOR";

export interface Role {
  id: number,
  label: `ROLE_${RoleUnion}`
}

export type RoleMap = {[key in RoleUnion]: Role};

/**
* Roles can be used to mask/unmask
* menus to user
* this is NOT a sécurity Feature since
* Security is handled by the BE

*  Having them starting with ROLE_
*  is NOT a thing I fancy
*  but a TRUE REQUIREMENT for the
*  spring security to recognize the GrantedAuthorities
*  the guy who designed that instead of a simple string comparison needs
*  should be publicly ashamed for his lack of common sense
* @author Vincent, DorianBoel
*/
export const ROLES: Readonly<RoleMap> = {
  ADMINISTRATOR: {
    id: 1,
    label: "ROLE_ADMINISTRATOR"
  },
  MANAGER: {
    id: 2000,
    label: "ROLE_MANAGER"
  },
  COLLABORATOR: {
    id: 3000,
    label: "ROLE_COLLABORATOR"
  }
}
