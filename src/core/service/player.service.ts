import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import "rxjs/add/operator/map";
import {Player, PlayerControllerService, Team} from "../../providers";

@Injectable()
export class PlayerService {

  constructor(private playerCtrl: PlayerControllerService) {
  }

  addPlayer(item: Player): Observable<number> {
    return this.playerCtrl.createPlayerUsingPOST(item)
      .map(value => {
        console.log('Added player: ', value);
        return value;
      });
  }

  deletePlayer(item: Player): Observable<boolean> {
    return this.playerCtrl.deletePlayerUsingDELETE(item.id)
      .map(value => {
        console.log('Deleted player: ', value);
        return value;
      });
  }

  getPlayer(id: number): Observable<Player> {
    return this.playerCtrl.retrievePlayerUsingGET(id)
      .map(value => {
        console.log('Loaded player: ', value);
        return value;
      });
  }

  getPlayers(): Observable<Player[]> {
    return this.playerCtrl.retrieveAllPlayersUsingGET()
      .map(values => this.addTeamsToPlayers(values))
      .map(values => {
        console.log('Loaded players: ', values);
        return values;
      });
  }

  savePlayer(item: Player): Observable<boolean> {
    return this.playerCtrl.updatePlayerUsingPUT(item, item.id)
      .map(value => {
        console.log('Saved player: ' + value);
        return value;
      });
  }

  addTeamsToPlayers(players: Player[]): Player[] {
    for (let i = 0; i < players.length; i++) {
      players[i] = this.addTeamsToPlayer(players[i]);
    }
    return players;
  }

  addTeamsToPlayer(player: Player): Player {
    let teamNames = ["Brugge", "KV Oostende"];
    let teamIds = [19,20];
    let teams: Team[] = [];
    let team;
    for (let i = 0; i < teamNames.length; i++) {
      team = new Team();
      team.id = teamIds[i];
      team.name = teamNames[i];
      teams.push(team);
    }
    player.teams = teams;
    return player;
  }
}
