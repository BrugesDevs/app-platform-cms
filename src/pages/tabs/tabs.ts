import {Component} from '@angular/core';
import {NewsItemsComponent} from "../news-items/news-items.component";
import {Players} from "../players/players";
import {Teams} from "../teams/teams";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NewsItemsComponent;
  tab2Root = Players;
  tab3Root = Teams;

  constructor() {

  }
}
