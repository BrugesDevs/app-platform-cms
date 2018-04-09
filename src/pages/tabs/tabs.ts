import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {NewsItemsComponent} from "../news-items/news-items.component";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NewsItemsComponent;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
