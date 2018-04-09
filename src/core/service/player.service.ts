import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import "rxjs/add/operator/map";
import {Player, PlayerControllerService} from "../../providers";

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
}
