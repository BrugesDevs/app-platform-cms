import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {Team} from "../../providers";

/**
 * Generated class for the TeamToPlayer page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-team-to-player',
  templateUrl: 'team-to-player.html',
})
export class TeamToPlayer {

  items: Team[] = [];
  addedItems: Team[] = [];

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.items = this.navParams.get('items');
  }

  opslaan() {
    this.viewCtrl.dismiss(this.addedItems);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  itemClicked(team: Team, selected: boolean) {
    if (selected) {
      this.addedItems.push(team);
    } else {
      var index = this.addedItems.indexOf(team, 0);
      if (index > -1) {
        this.addedItems.splice(index, 1);
      }
    }
  }
}
