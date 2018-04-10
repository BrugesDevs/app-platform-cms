import {Injectable} from '@angular/core';
import {Team} from '../../providers/index';
import {Events} from "ionic-angular";
import {EventChannels} from "../constants/event-channels";
import {TeamService} from "../service/team.service";

@Injectable()
export class TeamFacade {

  teams: Team[] = [];
  currentTeam: Team;

  constructor(private teamService: TeamService, private events: Events) {

  }

  loadTeams(): void {
    this.teamService.getTeams()
      .map(value => {
        this.events.publish(EventChannels.CHANNEL_TEAMS_HIDE_REFRESHER);
        return value;
      })
      .subscribe((loadedTeams: Team[]) => this.teams = loadedTeams);
  }

  loadTeam(teamId: number) {
    this.teamService.getTeam(teamId)
      .subscribe(value => {
        this.currentTeam = value;
        this.events.publish(EventChannels.CHANNEL_TEAM_LOADED);
      })
  }

  verwijderTeam(team: Team) {
    /*Optimistic revoval of item*/
    var index = this.teams.indexOf(team, 0);
    if (index > -1) {
      this.teams.splice(index, 1);

      this.teamService.deleteTeam(team)
        .subscribe((isDeleted: boolean) => {
          //TODO IF ITEM IS NOT DELETED FROM API PUSH IT BACK IN THE LIST
          // if (!isDeleted) {
          //   this.teams.push(team);
          // }
          this.events.publish(EventChannels.CHANNEL_TEAM_DELETED, team);
        });
    } else {
      console.error("Inconsistent state while delete team: ", team);
    }
  }

  saveTeam(team: Team) {
    this.teamService.saveTeam(team)
      .subscribe((isSaved: boolean) => {
        this.events.publish(EventChannels.CHANNEL_TEAM_UPDATED, isSaved);
      });
  }

  addTeam(team: Team) {
    this.teamService.addTeam(team)
      .subscribe((addedId: number) => {
        team.id = addedId;
        this.teams.push(team);
        this.events.publish(EventChannels.CHANNEL_TEAM_CREATED, team);
      });
  }
}
