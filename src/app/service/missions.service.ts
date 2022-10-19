import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';
import { Observable } from 'rxjs';
import { API_Route } from 'src/environments/API_route';
import { AP_Vars } from 'src/environments/API_Vars';
import { Mission } from '../model/mission';
import { ToolBox } from '../model/toolBox';
import { AuthenticationService } from './authentication.service';
import * as pdfMake from "pdfmake/build/pdfMake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;// pdf aren't gnerated if you don't have this
// yhea that's ugly


@Injectable({
  providedIn: 'root'
})

/**
 * Communique avec l'API pour les Missions et leurs gestion
 * @date 21/09/2022 - 11:48:21
 *
 * @export
 * @class MissionsService
 * @typedef {MissionsService}
 */
export class MissionsService {
  // url de test du json-server
  /**
   * Description placeholder
   * @date 21/09/2022 - 11:48:21
   *
   * @private
   * @type {string}
   */
  private FULL_URL = `http://localhost:3000/mission`;

  private API_AFTER_URL = API_Route.MISSION;
  private API_VALIDATE = API_Route.VALIDER;
  private API_REJECT = API_Route.REJETER;
  private API_RESET = API_Route.RESET;
  private tools: ToolBox = new ToolBox();



  ;

  /**
   * Creates an instance of MissionsService.
   * @date 21/09/2022 - 11:48:21
   *
   * @constructor
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    /** this is because you need to fill in fonts
    its not made by default because you could want to use a custom font
    */
    //pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }



  /**
   * Description placeholder
   * @date 21/09/2022 - 11:48:21
   *
   * @returns {Observable<Mission[]>}
   */
  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`);

  }

  getMissionsToValidate(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${API_Route.MANAGER}/${this.authenticationService.currentUser()?.id}`);
  }

  /**get the mission Data with the provideed id
   *
   * @param id mission id
   * @returns a subject that you can make a subscribe on it
   */
  getMission(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${id}`);
  }
  /**
   * envoie une demande d'ajout d'une mission à l'API
   * avec les données de la mission à ajouter
   * @param mission
   * @returns
   */
  createMission(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`, mission);
  }
  /**
   * envoi une demande de modification de mission à l'API
   * avec les données de la mission
   * @param mission
   * @returns
   */
  updateMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${mission.id}`, mission);
  }

  /**
   * envoie une demande de suppression de la mission à l'API
   * @param mission à surprimer
   * @returns mission suprimée
   */
  deleteMission(mission: Mission): Observable<Mission> {
    return this.http.delete<Mission>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${mission.id}`);
  }
  /**
   * envoi une demande de validation à l'API
   * avec les données de la mission à valider
   * @param mission
   * @returns
   */
  validateMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${mission.id}/${this.API_VALIDATE}`, mission);
  }
  /**
   * envoie une demande de rejet de la mission à l'API
   * avec les données de la mission à rejeter
   * @param mission
   * @returns
   */
  rejectMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${mission.id}/${this.API_REJECT}`, mission);
  }

  /**
    * envoie une demande de réinitialisation de la mission à l'API
    * avec les données de la mission à réinitialiser
    * @param mission
    * @returns
    */
  resetMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${mission.id}/${this.API_RESET}`, mission);
  }
  /**
   * is supposed to expot the mission as a pdf document
   * @param mission
   */
  pdfExport(mission: Mission): void {
    // definition d'un document pdf
    let pdf: TDocumentDefinitions = {
      // autorisations pour certaines action sur le pdf
      ownerPassword: AP_Vars.pdfOwnerPassword,
      permissions: {
        printing: 'highResolution', //'lowResolution'
        modifying: false,
        copying: true,
        annotating: true,
        fillingForms: true,
        contentAccessibility: true,
        documentAssembly: true
      },

      header: {// header is the fine line at the top of the page
        style: `titre`,
        text: [

        ]
      }
      ,
      footer: function (currentPage, pageCount) {
        return [
          {
            style: 'footer',
            text: `page ${currentPage.toString()} de ${pageCount}`
          }
        ];
      },
      content: [

        // company name and logo
        {
          tocItem: `identity`,
          style: 'titre',
          text: AP_Vars.company_name,
        },
        // mission details
        {
          style: 'mission_details',
          text: [
            {
              fontSize: 16,
              bold: true,
              color: 'blue',
              text: `${mission.nature.description} \n`,
            },
            {
              text: ` du ${this.tools.date(mission.start)} au ${this.tools.date(mission.end)} \n`,
            },
            {
              color: '#3399ff',
              fontSize: 14,
              text: `${mission.collaborator?.firstName} ${mission.collaborator?.firstName}`,
            },
          ]
        },


        // expense table
        {
          style: 'expenses',
          margin: [5, 2],
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            body: [ // table header
              [{ style: `table_headers`, text: `type` },
              { style: `table_headers`, text: `date` },
              { style: `table_headers`, text: `montant HT` },
              { style: `table_headers`, text: `TVA` },
              { style: `table_headers`, text: `montant TTC` }],
              ...mission.expenses.map(e => (// expenses lines
                [e.type.name,
                `${this.tools.date(e.date)}`,
                { style: `numbers`, text: e.cost.toFixed(2) },
                { style: `numbers`, text: e.tva.toFixed(2) },
                { style: `numbers`, text: this.tools.expenseTTC(e).toFixed(2) }]
              )
              ),
              // table foot
              ['', '', { text: "total HT :", colSpan: 1 }, { style: `numbers`, text: this.tools.sumExpenses(mission.expenses).toFixed(2), colSpan: 2 }, 0], // bas du tableau
              ['', '', { text: "total TTC:", colSpan: 1 }, { style: `numbers`, text: this.tools.sumExpensesTTC(mission.expenses).toFixed(2), colSpan: 2 }, 0],//// bas du tableau

            ]
          }
        }


      ],
      pageOrientation: 'portrait', //
      pageSize: 'A4',
      info: { // metadatas  du document
        title: `frais de la mission ${mission.nature.description}`,
        author: `${mission.collaborator?.firstName} ${mission.collaborator?.lastName}`,
        subject: `${mission.nature.description}  du ${mission.start} au ${mission.end}`,
        keywords: `${mission.nature.description},${mission.start},${mission.end},${mission.startCity.name},${mission.arrivalCity.name},${mission.status},${mission.transport}`,
      },

      styles: {
        titre: {
          alignment: 'center',
          fontSize: 32,
          margin: [0, 50, 0, 50],
          bold: true
        },
        numbers: {

          alignment: 'right'
        },
        table_headers: {
          alignment: 'center'
        },
        mission_details: {
          alignment: 'right',
          fontSize: 12,
          margin: [0, 50, 0, 50]
        },
        expenses: {

          fontSize: 12,
        },
        footer: {
          alignment: 'right',
          margin: [30, 5],
        }
      }

    };
    pdfMake.createPdf(pdf).open();
    localStorage.setItem("mission", JSON.stringify(mission, null, 1));
    Notiflix.Notify.success(" les frais de la mission ont été exporté avec succés vers un pdf \n une nouvelle fenêtre va s'ouvrir.");
  }
}
