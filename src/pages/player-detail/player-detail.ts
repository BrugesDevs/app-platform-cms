import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Events, NavController, NavParams, ToastController} from "ionic-angular";
import {NavigationParams} from "../../core/constants/navigation-params";
import {EventChannels} from "../../core/constants/event-channels";
import {PlayerFacade} from "../../core/facade/player.facade";
import {Player} from "../../providers";


/**
 * Generated class for the PlayerDetail page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-player-detail',
  templateUrl: 'player-detail.html',
})
export class PlayerDetail implements OnDestroy {

  @ViewChild('saveButton') saveButton;

  saveButtonText: string = 'Opslaan';
  player: Player;

  constructor(private facade: PlayerFacade,
              private navCtrl: NavController,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private events: Events) {
    this.player = this.navParams.get(NavigationParams.PLAYER);
    if (!this.player) {
      this.saveButtonText = 'Aanmaken';
      this.player = new Player();
    }

    this.events.subscribe(EventChannels.CHANNEL_PLAYER_UPDATED,(isSaved: boolean)=>{
      this.showToast("Player opgeslagen", 2000);
    });

    this.events.subscribe(EventChannels.CHANNEL_PLAYER_CREATED, (player: Player)=>{
      this.showToast("Player aangemaakt", 2000);
      this.saveButtonText = 'Opslaan';
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(EventChannels.CHANNEL_PLAYER_UPDATED);
    this.events.unsubscribe(EventChannels.CHANNEL_PLAYER_CREATED);
    this.save();
  }

  goBack(): void {
    this.navCtrl.pop();
  }

  save(): void {
    if (this.player.id) {
      this.facade.savePlayer(this.player);
    } else {
      this.facade.addPlayer(this.player);
    }
  }

  private showToast(message: string, duration: number){
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
