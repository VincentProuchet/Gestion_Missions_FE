

/**
 on strocke ici les variables envirronement
 oui il y en a deux parce que l'une doit référencer
 une valeur de l'autre
* @author Vincent
*/

import { ROUTER_CONFIGURATION } from "@angular/router";

export /**
 * Vars containing URL
 * @date 23/09/2022 - 10:58:01
 *
 * @type {{ angularServingUrl: string; springUrl: string; jsonServerUrl: string; CORS_SafetyUrl: string; }}
 */
  const API_Url = {
    /** host form npm start */
    angularServingUrl: `http://localhost:4200`,
    /** url of self hosted spring API */
    springUrl: `http://localhost:8080`,
    /** url of json server
    that was used to give mock data
    to FE devs
    while developing the back-end
    now I would do it differently
    */
    jsonServerUrl: `http://localhost:3000`,
    /**
      this is a we had to resort to it
      because of the way npm serve handle things

    */
    CORS_SafetyUrl: 'api',
  };
/**
FE vars
 * we delocalize environement vars
from environement.ts
I'm not a fan of those kind of surprises
 */
export const AP_Vars = {

  /** proxy BE connection parameter */
  BEConnectionUrl: API_Url.CORS_SafetyUrl,
  /** locale value
  used for converting date formats
   */
  dateLocale: 'fr-FR',
  /** format for dipslayed date for humans */
  dateFormat: "YYYY MMM dd",
  /** cookie where we store user datas
    used for access
    and completing object on request
    they are purely UI/UX
    since all app security is handled on back-end
    make sure its 'cookieName'
  */
  CookiesNameUser: 'user',
  /**
    this is where spring place its session info
    we can erase it for loginOut
   */
  CookiesNameSession: 'JSESSIONID',



}
