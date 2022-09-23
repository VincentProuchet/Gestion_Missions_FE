

/**
 on strocke ici les variables envirronement
 oui il y en a deux parce que l'une doit référencer
 une valeur de l'autre
* @author Vincent
*/

export const API_Url = {

  angularServingUrl: `http://localhost:4200`,
  springUrl: `http://localhost:8080`,
  jsonServerUrl: `http://localhost:3000`,
  CORS_SafetyUrl: 'api',
};
/**
 * on vas délocaliser les variables envirronement
histoire de s'éviter des surprises
 */
export const AP_Vars = {

  BEConnectionUrl: API_Url.CORS_SafetyUrl,
  baseUrl: `http://localhost:8080`,
  dateLocale: 'fr-FR',
  dateFormat: "YYYY MMM dd",


}
