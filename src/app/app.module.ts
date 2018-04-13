import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NewsItemsComponent} from "../pages/news-items/news-items.component";
import {NewsItemDetailComponent} from "../pages/news-item-detail/news-item-detail.component";
import {NewsItemService} from "../core/service/news-item.service";
import {NewsItemControllerService, PlayerControllerService, TeamControllerService} from "../providers";
import {HttpClientModule} from "@angular/common/http";
import {PlayerFacade} from "../core/facade/player.facade";
import {PlayerService} from "../core/service/player.service";
import {NewsItemFacade} from "../core/facade/news-item.facade";
import {Players} from "../pages/players/players";
import {PlayerDetail} from "../pages/player-detail/player-detail";
import {TeamService} from "../core/service/team.service";
import {TeamFacade} from "../core/facade/team.facade";
import {TeamDetail} from "../pages/team-detail/team-detail";
import {Teams} from "../pages/teams/teams";
import {TeamToPlayer} from "../pages/team-to-player/team-to-player";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    NewsItemsComponent,
    NewsItemDetailComponent,
    Players,
    PlayerDetail,
    Teams,
    TeamDetail,
    TeamToPlayer
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    NewsItemsComponent,
    NewsItemDetailComponent,
    Players,
    PlayerDetail,
    Teams,
    TeamDetail,
    TeamToPlayer
  ],
  providers: [
    PlayerFacade,
    PlayerService,
    NewsItemFacade,
    NewsItemService,
    NewsItemControllerService,
    PlayerControllerService,
    TeamControllerService,
    TeamFacade,
    TeamService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
