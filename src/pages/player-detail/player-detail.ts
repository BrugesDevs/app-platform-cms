import {Component, OnDestroy, ViewChild} from '@angular/core';
import {Events, NavController, NavParams, ToastController} from "ionic-angular";
import {NavigationParams} from "../../core/constants/navigation-params";
import {EventChannels} from "../../core/constants/event-channels";
import {PlayerFacade} from "../../core/facade/player.facade";
import {Player, Team} from "../../providers";


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

  constructor(protected facade: PlayerFacade,
              private navCtrl: NavController,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private events: Events) {
    this.facade.currentPlayer = this.navParams.get(NavigationParams.PLAYER);
    if (!this.facade.currentPlayer) {
      this.saveButtonText = 'Aanmaken';
      this.facade.currentPlayer = new Player();
    }

    this.events.subscribe(EventChannels.CHANNEL_PLAYER_UPDATED, (isSaved: boolean) => {
      this.showToast("Player opgeslagen", 2000);
    });

    this.events.subscribe(EventChannels.CHANNEL_PLAYER_CREATED, (player: Player) => {
      this.showToast("Player aangemaakt", 2000);
      this.saveButtonText = 'Opslaan';
    });

    this.events.subscribe(EventChannels.CHANNEL_PLAYER_TEAM_DELETE, (team: Team) => {
      this.showUndoTeamToast("Speler " + this.facade.currentPlayer.firstName + " werd verwijderd uit team " +
        team.name, 3500, team);
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(EventChannels.CHANNEL_PLAYER_UPDATED);
    this.events.unsubscribe(EventChannels.CHANNEL_PLAYER_CREATED);
    this.events.unsubscribe(EventChannels.CHANNEL_PLAYER_TEAM_DELETE);
    this.save();
  }

  goBack(): void {
    this.navCtrl.pop();
  }

  save(): void {
    if (this.facade.currentPlayer.id) {
      this.facade.savePlayer(this.facade.currentPlayer);
    } else {
      this.facade.addPlayer(this.facade.currentPlayer);
    }
  }

  showTeams() {
    //TODO SHOW TEAMS DIALOG
  }

  addTeam(team: Team) {
    this.facade.addTeam(team);
  }

  removeTeam(team: Team) {
    this.facade.removeTeam(team);
  }

  private showUndoTeamToast(message: string, duration: number, team: Team) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      closeButtonText: 'Ongedaan maken'
    });

    toast.onDidDismiss((data, role) => {
      if (role == 'close') {
        this.facade.addTeam(team);
      }
    });

    toast.present();
  }

  private showToast(message: string, duration: number) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });

    toast.present();
  }
}
