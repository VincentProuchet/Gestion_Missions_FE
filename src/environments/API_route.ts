
/**
 * Constant des routes de l'API
 * pour utilisation dans les service
*  ce sont des routes de l'api qui peuvent changer
en fonction de ce que serat le backend final
 */
export const API_Route = {
  /** login form target */
  SIGNIN: "login",
  /** */
  SIGNUP: "signup",
  /** logout target its a spring Security generated */
  LOGOUT: "logout",
  /** for error display */
  ERRORS: "error",
  /** for nature service */
  NATURE: "nature",
  /** for manager Service */
  MANAGER: "manager",
  /** for mission Service */
  MISSION: "mission",
  /**
   *  there is no need for security before sending to
   *  to backEnd
   */
  /** for mission validation */
  VALIDER: "/valider",
  /** for mission rejection */
  REJETER: "/rejeter",
  /** for mission reset */
  RESET: "/reset",
  /** for expense Service */
  EXPENSE: "expense",
  /** for expense service type */
  TYPE: "_type",
  /** for city */
  CITY: "city",
  /** favicon not use but just in case */
  FAVICON: "/favicon.ico",
};
