/**
 * Appplatform backend
 * App platform
 *
 * OpenAPI spec version: 0.0.
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { Team } from '../model/team';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class TeamControllerService {

  protected basePath = 'http://localhost:8080';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (let consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }


  /**
   * createTeam
   *
   * @param team team
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createTeamUsingPOST(team: Team, observe?: 'body', reportProgress?: boolean): Observable<number>;
  public createTeamUsingPOST(team: Team, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<number>>;
  public createTeamUsingPOST(team: Team, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<number>>;
  public createTeamUsingPOST(team: Team, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
    if (team === null || team === undefined) {
      throw new Error('Required parameter team was null or undefined when calling createTeamUsingPOST.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set("Accept", httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    let consumes: string[] = [
      'application/json'
    ];
    let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set("Content-Type", httpContentTypeSelected);
    }

    return this.httpClient.post<Team>(`${this.basePath}/teams`,
      team,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * deleteTeam
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteTeamUsingDELETE(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteTeamUsingDELETE(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteTeamUsingDELETE(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteTeamUsingDELETE(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling deleteTeamUsingDELETE.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set("Accept", httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    let consumes: string[] = [
      'application/json'
    ];

    return this.httpClient.delete<any>(`${this.basePath}/teams/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * retrieveAllTeams
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public retrieveAllTeamsUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<Team>>;
  public retrieveAllTeamsUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Team>>>;
  public retrieveAllTeamsUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Team>>>;
  public retrieveAllTeamsUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set("Accept", httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    let consumes: string[] = [
      'application/json'
    ];

    return this.httpClient.get<Array<Team>>(`${this.basePath}/teams`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * retrieveTeam
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public retrieveTeamUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<Team>;
  public retrieveTeamUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Team>>;
  public retrieveTeamUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Team>>;
  public retrieveTeamUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling retrieveTeamUsingGET.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set("Accept", httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    let consumes: string[] = [
      'application/json'
    ];

    return this.httpClient.get<Team>(`${this.basePath}/teams/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * updateTeam
   *
   * @param team team
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateTeamUsingPUT(team: Team, id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public updateTeamUsingPUT(team: Team, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public updateTeamUsingPUT(team: Team, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public updateTeamUsingPUT(team: Team, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
    if (team === null || team === undefined) {
      throw new Error('Required parameter team was null or undefined when calling updateTeamUsingPUT.');
    }
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling updateTeamUsingPUT.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set("Accept", httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    let consumes: string[] = [
      'application/json'
    ];
    let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set("Content-Type", httpContentTypeSelected);
    }

    return this.httpClient.put<any>(`${this.basePath}/teams/${encodeURIComponent(String(id))}`,
      team,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}
