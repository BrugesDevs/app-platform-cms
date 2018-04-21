// import { Component } from '@angular/core';
//
// /**
//  * Generated class for the TeamDetail page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */
import {Component, OnDestroy, ViewChild} from "@angular/core";
import {NavigationParams} from "../../core/constants/navigation-params";
import {TeamFacade} from "../../core/facade/team.facade";
import {Events, ModalController, NavController, NavParams, ToastController} from "ionic-angular";
import {Player, Team} from "../../providers";
import {EventChannels} from "../../core/constants/event-channels";
import {TeamToPlayer} from "../team-to-player/team-to-player";
import {CheckBoxDialog} from "../check-box-dialog/check-box-dialog.component";

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetail implements OnDestroy {

  @ViewChild('saveButton') saveButton;

  saveButtonText: string = 'Opslaan';

  constructor(private facade: TeamFacade,
              private navCtrl: NavController,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController,
              private events: Events) {
    this.facade.currentTeam = this.navParams.get(NavigationParams.TEAM);
    if (!this.facade.currentTeam) {
      this.saveButtonText = 'Aanmaken';
      this.facade.currentTeam = new Team();
    }

    this.events.subscribe(EventChannels.CHANNEL_TEAM_UPDATED, (isSaved: boolean) => {
      this.showToast("Team opgeslagen", 2000);
    });

    this.events.subscribe(EventChannels.CHANNEL_TEAM_CREATED, (team: Team) => {
      this.showToast("Team aangemaakt", 2000);
      this.saveButtonText = 'Opslaan';
    });

    this.events.subscribe(EventChannels.CHANNEL_TEAM_PLAYER_DELETE, (player: Player) => {
      this.showUndoTeamToast("Speler " + player.firstName + " werd verwijderd uit team " +
        this.facade.currentTeam.name, 3500, player);
    });

    this.events.subscribe(EventChannels.CHANNEL_TEAM_FILTERED_PLAYERS, (players: Player[]) => {
      if (players.length > 0) {
        this.showFilteredPlayers(players);
      } else {
        this.showToast(this.facade.currentTeam.name + " bevat alle spelers", 2000);
      }
    })
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(EventChannels.CHANNEL_TEAM_UPDATED);
    this.events.unsubscribe(EventChannels.CHANNEL_TEAM_CREATED);
    this.events.unsubscribe(EventChannels.CHANNEL_TEAM_PLAYER_DELETE);
    this.events.unsubscribe(EventChannels.CHANNEL_TEAM_FILTERED_PLAYERS);
    this.save();
  }

  goBack(): void {
    this.navCtrl.pop();
  }

  save(): void {
    if (this.facade.currentTeam.id) {
      this.facade.saveTeam(this.facade.currentTeam);
    } else {
      this.facade.addTeam(this.facade.currentTeam);
    }
  }

  deletePlayer(chip: Element, player: Player) {
    // chip.remove();//TODO POSSIBLE NOT NECESAIRY
    this.facade.deletePlayer(player);
  }

  showPlayers() {
    this.facade.getPlayersNotPresentInTeam();
  }

  showFilteredPlayers(filterdPlayers: Player[]) {
    let modal = this.modalCtrl.create(CheckBoxDialog, {
      items: filterdPlayers,
      message: "Voeg speler toe aan " + this.facade.currentTeam.name
    });
    modal.onDidDismiss((players: Player[]) => {
      if (players) {
        this.facade.addPlayersToTeam(players);
      }
    });
    modal.present();
  }

  private showToast(message: string, duration: number) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  private showUndoTeamToast(message: string, duration: number, player: Player) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      closeButtonText: 'Ongedaan maken'
    });

    toast.onDidDismiss((data, role) => {
      if (role == 'close') {
        this.facade.addPlayer(player);
      }
    });

    toast.present();
  }

}

