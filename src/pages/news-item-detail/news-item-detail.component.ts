import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NewsItemService} from '../../core/service/news-item.service';
import {Location} from '@angular/common';
import {NewsItem} from '../../providers/index';
import {NavigationParams} from "../../core/constants/navigation-params";
import {Events, NavController, NavParams, ToastController} from "ionic-angular";
import {EventChannels} from "../../core/constants/event-channels";
import {NewsItemFacade} from "../../core/facade/news-item.facade";

@Component({
  selector: 'news-item-detail',
  templateUrl: './news-item-detail.component.html'
})
export class NewsItemDetailComponent implements OnInit, OnDestroy {

  @ViewChild('saveButton') saveButton;

  saveButtonText: string = 'Opslaan';
  newsItem: NewsItem;

  constructor(private facade: NewsItemFacade,
              private navCtrl: NavController,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private events: Events) {
    this.newsItem = this.navParams.get(NavigationParams.NEWSIEM);
    if (!this.newsItem) {
      this.saveButtonText = 'Aanmaken';
      this.newsItem = new NewsItem();
    }

    this.events.subscribe(EventChannels.CHANNEL_NEWS_ITEM_UPDATED,(isSaved: boolean)=>{
      this.showToast("News item opgeslagen", 2000);
      //TODO RELOAD ITEM
    });

    this.events.subscribe(EventChannels.CHANNEL_NEWS_ITEM_CREATED, (newsItem: NewsItem)=>{
      this.showToast("News item aangemaakt", 2000);
      this.saveButtonText = 'Opslaan';
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.events.unsubscribe(EventChannels.CHANNEL_NEWS_ITEM_UPDATED);
    this.events.unsubscribe(EventChannels.CHANNEL_NEWS_ITEM_CREATED);
    this.save();
  }

  goBack(): void {
    this.navCtrl.pop();
  }

  save(): void {
    if (this.newsItem.id) {
      this.facade.saveNewsItem(this.newsItem);
    } else {
      this.facade.addNewsItem(this.newsItem);
    }
  }

  private showToast(message: string, duration: number){
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
