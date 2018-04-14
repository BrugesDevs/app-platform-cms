import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import "rxjs/add/operator/map";
import {Player, Team, TeamControllerService} from "../../providers";

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
      .map(value => this.addPlayersToTeams(value))
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

  addPlayersToTeams(teams: Team[]){
    for (let i = 0; i < teams.length; i++) {
      teams[i] = this.addPlayersToTeam(teams[i]);
    }
    return teams;
  }

  addPlayersToTeam(team: Team): Team {
    let names = ["Robin", "Lana", "Leonel"];
    let lastNames = ["Bruneel", "Magerman", "Messi"];
    let dates = ["18/08/1993","18/08/1993","18/08/1993"];
    let ids = [10,11,12];
    let nationalities = ["Belg", "Belg", "Belg"];
    let playerNumbers = [9,10,11];
    let player;
    let players: Player[] = [];
    for (let i = 0; i < 3; i++) {
      player = new Player();
      player.id = ids[i];
      player.firstName = names[i];
      player.lastName = lastNames[i];
      player.birthDate = dates[i];
      player.nationality = nationalities[i];
      player.playerNumber = playerNumbers[i];
      players.push(player);
    }
    team.players = players;
    return team;
  }
}
