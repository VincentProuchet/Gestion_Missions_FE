
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
*  should be publicly ashamed for is lack of common sense
* @author Vincent
*/
export const API_Role = {
  /** ADMIN */
  ADMIN: "ROLE_ADMINISTRATOR",
  /** MANAGER */
  MANAGER: "ROLE_MANAGER",
  /** COLLABORATOR */
  COLLABORATOR: "ROLE_COLLABORATOR",
  /** USER  not used */
  USER: "ROLE_USER",
  /** ANON  used for default */
  ANON: "ROLE_ANONY",

};
