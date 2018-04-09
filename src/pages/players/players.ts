import { Component } from '@angular/core';
$IMPORTSTATEMENT

/**
 * Generated class for the Players page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
$IONICPAGE
@Component({
  selector: 'page-players',
  templateUrl: 'players.html',
})
export class Players {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Players');
  }

}
