import {Component} from '@angular/core';
import {Events, NavController, Refresher, ToastController} from "ionic-angular";
import {Player} from "../../providers";
import {EventChannels} from "../../core/constants/event-channels";
import {PlayerDetail} from "../player-detail/player-detail";
import {PlayerFacade} from "../../core/facade/player.facade";

/**
 * Generated class for the Players page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-players',
  templateUrl: 'players.html',
})
export class Players {

  private refresher: Refresher;

  constructor(private playerFacade: PlayerFacade,
              private events: Events,
              private toastCtrl: ToastController,
              private navCtrl: NavController) {
    this.events.subscribe(EventChannels.CHANNEL_PLAYERS_HIDE_REFRESHER,()=>{
      if (this.refresher) {
        this.refresher.complete();
      }
    });

    this.events.subscribe(EventChannels.CHANNEL_PLAYER_DELETED, (isDeleted: boolean)=>{
      this.showToast("Speler verwijderd", 2000);
    });
  }

  ngOnInit(): void {
    this.playerFacade.loadPlayers();
  }

  ngOnDestroy(): void{
    this.events.unsubscribe(EventChannels.CHANNEL_PLAYERS_HIDE_REFRESHER);
    this.events.unsubscribe(EventChannels.CHANNEL_PLAYER_DELETED);
  }

  addPlayer(){
    this.navCtrl.push(PlayerDetail);
  }

  doRefresh(refresher: Refresher) {
    console.log("Refresh Players ", refresher);
    this.refresher = refresher;
    this.playerFacade.loadPlayers();
  }

  bewerken(player: Player) {
    this.navCtrl.push(PlayerDetail ,{ PLAYER : player});
  }

  verwijderen(newsItem: Player) {
    this.playerFacade.verwijderPlayer(newsItem);
  }

  private showToast(message: string, duration: number){
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
