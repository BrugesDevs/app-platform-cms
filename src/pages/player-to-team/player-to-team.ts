import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {Player} from "../../providers";

/**
 * Generated class for the TeamToPlayer page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-player-to-team',
  templateUrl: 'player-to-team.html',
})
export class PlayerToTeam {

  message: string = "";
  items: Player[] = [];
  addedItems: Player[] = [];

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.items = this.navParams.get('items');
    this.message = this.navParams.get('message');
  }

  opslaan() {
    this.viewCtrl.dismiss(this.addedItems);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  itemClicked(player: Player, selected: boolean) {
    if (selected) {
      this.addedItems.push(player);
    } else {
      var index = this.addedItems.indexOf(player, 0);
      if (index > -1) {
        this.addedItems.splice(index, 1);
      }
    }
  }
}
