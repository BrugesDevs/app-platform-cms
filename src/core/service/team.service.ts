import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import "rxjs/add/operator/map";
import {Team, TeamControllerService} from "../../providers";

@Injectable()
export class TeamService {

  constructor(private teamCtrl: TeamControllerService) {
  }

  addTeam(item: Team): Observable<number> {
    return this.teamCtrl.createTeamUsingPOST(item)
      .map(value => {
        console.log('Added Team: ', value);
        return value;
      });
  }

  deleteTeam(item: Team): Observable<boolean> {
    return this.teamCtrl.deleteTeamUsingDELETE(item.id)
      .map(value => {
        console.log('Deleted team: ', value);
        return value;
      });
  }

  getTeam(id: number): Observable<Team> {
    return this.teamCtrl.retrieveTeamUsingGET(id)
      .map(value => {
        console.log('Loaded team: ', value);
        return value;
      });
  }

  getTeams(): Observable<Team[]> {
    return this.teamCtrl.retrieveAllTeamsUsingGET()
      .map(values => {
        console.log('Loaded teams: ', values);
        return values;
      });
  }

  saveTeam(item: Team): Observable<boolean> {
    return this.teamCtrl.updateTeamUsingPUT(item, item.id)
      .map(value => {
        console.log('Saved team: ' + value);
        return value;
      });
  }
}
