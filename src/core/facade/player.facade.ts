import {Injectable} from '@angular/core';
import {Player, Team} from '../../providers/index';
import {Events} from "ionic-angular";
import {EventChannels} from "../constants/event-channels";
import {PlayerService} from "../service/player.service";

@Injectable()
export class PlayerFacade {

  players: Player[] = [];
  currentPlayer: Player;

  constructor(private playerService: PlayerService, private events: Events) {

  }

  loadPlayers(): void {
    this.playerService.getPlayers()
      .map(value => {
        this.events.publish(EventChannels.CHANNEL_PLAYERS_HIDE_REFRESHER);
        return value;
      })
      .subscribe((loadedPlayers: Player[]) => this.players = loadedPlayers);
  }

  loadPlayer(playerId: number) {
    this.playerService.getPlayer(playerId)
      .subscribe(value => {
        this.currentPlayer = value;
        this.events.publish(EventChannels.CHANNEL_PLAYER_LOADED);
      })
  }

  verwijderPlayer(player: Player) {
    /*Optimistic revoval of item*/
    var index = this.players.indexOf(player, 0);
    if (index > -1) {
      this.players.splice(index, 1);

      this.playerService.deletePlayer(player)
        .subscribe((isDeleted: boolean) => {
          //TODO IF ITEM IS NOT DELETED FROM API PUSH IT BACK IN THE LIST
          // if (!isDeleted) {
          //   this.players.push(player);
          // }
          this.events.publish(EventChannels.CHANNEL_PLAYER_DELETED, player);
        });
    } else {
      console.error("Inconsistent state while delete player: ", player);
    }
  }

  savePlayer(player: Player) {
    this.playerService.savePlayer(player)
      .subscribe((isSaved: boolean) => {
        this.events.publish(EventChannels.CHANNEL_PLAYER_UPDATED, isSaved);
      });
  }

  addPlayer(player: Player) {
    this.playerService.addPlayer(player)
      .subscribe((addedId: number) => {
        player.id = addedId;
        this.players.push(player);
        this.events.publish(EventChannels.CHANNEL_PLAYER_CREATED, player);
      });
  }

  removeTeam(team: Team) {
    /*Optimistic revoval of item*/
    var index = this.currentPlayer.teams.indexOf(team, 0);
    if (index > -1) {
      this.currentPlayer.teams.splice(index, 1);

      //TODO DELETE SERVER SIDE
      this.events.publish(EventChannels.CHANNEL_PLAYER_TEAM_DELETE, team);
    } else {
      //TODO INCONSISTENT STATE
    }
  }

  addTeam(team: Team) {
    this.currentPlayer.teams.push(team);
  }
}
