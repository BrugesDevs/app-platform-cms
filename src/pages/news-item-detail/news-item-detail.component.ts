import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NewsItemService} from '../../core/service/news-item.service';
import {Location} from '@angular/common';
import {NewsItem} from '../../providers/index';
import {NavigationParams} from "../../core/constants/navigation-params";
import {Events, NavController, NavParams} from "ionic-angular";
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
              private events: Events) {
    this.newsItem = this.navParams.get(NavigationParams.NEWSIEM);
    if (!this.newsItem) {
      this.saveButtonText = 'Aanmaken';
      this.newsItem = new NewsItem();
    }

    this.events.subscribe(EventChannels.CHANNEL_NEWS_ITEMS_UPDATE,(newsItem: NewsItem)=>{
      this.newsItem = newsItem;
    })
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.events.unsubscribe(EventChannels.CHANNEL_NEWS_ITEMS_UPDATE);
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
}
