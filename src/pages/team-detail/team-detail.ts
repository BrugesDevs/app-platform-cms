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
import {Events, NavController, NavParams, ToastController} from "ionic-angular";
import {Team} from "../../providers";
import {EventChannels} from "../../core/constants/event-channels";

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetail implements OnDestroy {

  @ViewChild('saveButton') saveButton;

  saveButtonText: string = 'Opslaan';
  team: Team;

  constructor(private facade: TeamFacade,
              private navCtrl: NavController,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private events: Events) {
    this.team = this.navParams.get(NavigationParams.TEAM);
    if (!this.team) {
      this.saveButtonText = 'Aanmaken';
      this.team = new Team();
    }

    this.events.subscribe(EventChannels.CHANNEL_TEAM_UPDATED,(isSaved: boolean)=>{
      this.showToast("Team opgeslagen", 2000);
    });

    this.events.subscribe(EventChannels.CHANNEL_TEAM_CREATED, (team: Team)=>{
      this.showToast("Team aangemaakt", 2000);
      this.saveButtonText = 'Opslaan';
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(EventChannels.CHANNEL_TEAM_UPDATED);
    this.events.unsubscribe(EventChannels.CHANNEL_TEAM_CREATED);
    this.save();
  }

  goBack(): void {
    this.navCtrl.pop();
  }

  save(): void {
    if (this.team.id) {
      this.facade.saveTeam(this.team);
    } else {
      this.facade.addTeam(this.team);
    }
  }

  private showToast(message: string, duration: number){
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  showPlayers() {
    //TODO SHOW TEAMS
  }
}

