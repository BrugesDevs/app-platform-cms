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
import {NewsItemFacade} from "../core/facade/news-item.facade";
import {NewsItemService} from "../core/service/news-item.service";
import {NewsItemControllerService} from "../providers";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    NewsItemsComponent,
    NewsItemDetailComponent
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
    NewsItemDetailComponent
  ],
  providers: [
    NewsItemFacade,
    NewsItemService,
    NewsItemControllerService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
