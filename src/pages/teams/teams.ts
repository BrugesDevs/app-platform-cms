import {Component, OnDestroy, OnInit} from '@angular/core';
import {Events, NavController, Refresher, ToastController} from "ionic-angular";
import {TeamFacade} from "../../core/facade/team.facade";
import {TeamDetail} from "../team-detail/team-detail";
import {Team} from "../../providers";
import {EventChannels} from "../../core/constants/event-channels";

/**
 * Generated class for the Teams page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class Teams implements OnInit, OnDestroy{

  private refresher: Refresher;

  constructor(private teamFacade: TeamFacade,
              private events: Events,
              private toastCtrl: ToastController,
              private navCtrl: NavController) {
    this.events.subscribe(EventChannels.CHANNEL_TEAMS_HIDE_REFRESHER,()=>{
      if (this.refresher) {
        this.refresher.complete();
      }
    });

    this.events.subscribe(EventChannels.CHANNEL_TEAM_DELETED, (isDeleted: boolean)=>{
      this.showToast("Team verwijderd", 2000);
    });
  }

  ngOnInit(): void {
    this.teamFacade.loadTeams();
  }

  ngOnDestroy(): void{
    this.events.unsubscribe(EventChannels.CHANNEL_TEAMS_HIDE_REFRESHER);
    this.events.unsubscribe(EventChannels.CHANNEL_TEAM_DELETED);
  }

  addTeam(){
    this.navCtrl.push(TeamDetail);
  }

  doRefresh(refresher: Refresher) {
    console.log("Refresh Teams ", refresher);
    this.refresher = refresher;
    this.teamFacade.loadTeams();
  }

  bewerken(team: Team) {
    this.navCtrl.push(TeamDetail ,{ TEAMS : team});
  }

  verwijderen(team: Team) {
    this.teamFacade.verwijderTeam(team);
  }

  private showToast(message: string, duration: number){
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
