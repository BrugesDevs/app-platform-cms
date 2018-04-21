import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {CheckboxSelectableInterface} from "../../core/interface/checkbox-selectable.interface";
import {Team} from "../../providers";

/**
 * Generated class for the TeamToPlayer page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-check-box-dialog',
  templateUrl: 'check-box-dialog.html',
})
export class CheckBoxDialog {

  message: string = "";
  items: CheckboxSelectableInterface[] = [];
  addedItems: CheckboxSelectableInterface[] = [];

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

  itemClicked(item: CheckboxSelectableInterface, selected: boolean) {
    if (selected) {
      this.addedItems.push(item);
    } else {
      var index = this.addedItems.indexOf(item, 0);
      if (index > -1) {
        this.addedItems.splice(index, 1);
      }
    }
  }
}
