import {Component} from '@angular/core';
import {ContactPage} from '../contact/contact';
import {NewsItemsComponent} from "../news-items/news-items.component";
import {Players} from "../players/players";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NewsItemsComponent;
  tab2Root = Players;
  tab3Root = ContactPage;

  constructor() {

  }
}
