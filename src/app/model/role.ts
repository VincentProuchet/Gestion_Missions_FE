export type RoleUnion = "ADMINISTRATOR" | "MANAGER" | "COLLABORATOR";

export interface Role {
  id: number,
  label: `ROLE_${RoleUnion}`
}

export type RoleMap = {[key in RoleUnion]: Role};

/**
 * roles des utilisateurs
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
