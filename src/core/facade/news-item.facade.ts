import {Injectable} from '@angular/core';
import {NewsItemService} from '../service/news-item.service';
import {NewsItem} from '../../providers/index';
import {Events} from "ionic-angular";
import {EventChannels} from "../constants/event-channels";

@Injectable()
export class NewsItemFacade {

  newsItems: NewsItem[] = [];
  currentNewsItem: NewsItem;

  constructor(private newsItemService: NewsItemService, private events: Events) {

  }

  loadNewsItems(): void {
    this.newsItemService.getNewsItems()
      .map(value => {
        this.events.publish(EventChannels.CHANNEL_NEWS_ITEMS_HIDE_REFRESHER);
        return value;
      })
      .subscribe((loadedNewsItems: NewsItem[]) => this.newsItems = loadedNewsItems);
  }

  loadNewsItem(newsItemId: number) {
    this.newsItemService.getNewsItem(newsItemId)
      .subscribe(value => {
        this.currentNewsItem = value;
        this.events.publish(EventChannels.CHANNEL_NEWS_ITEM_LOADED);
      })
  }

  verwijderNewsItem(newsItem: NewsItem) {
    this.newsItems.splice(this.newsItems.indexOf(newsItem, 1));
    this.newsItemService.deleteNewsItem(newsItem)
      .subscribe((isDeleted: boolean) => {
        if (!isDeleted) {
          this.newsItems.push(newsItem);
        }
        this.events.publish(EventChannels.CHANNEL_NEWS_ITEM_DELETED, newsItem);
      });
  }

  saveNewsItem(newsItem: NewsItem) {
    this.newsItemService.saveNewsItem(newsItem)
      .subscribe((isSaved: boolean) => {
        this.events.publish(EventChannels.CHANNEL_NEWS_ITEM_UPDATED, isSaved);
      });
  }

  addNewsItem(newsItem: NewsItem) {
    this.newsItemService.addNewsItem(newsItem)
      .subscribe((addedNewsItem: NewsItem) => {
        this.newsItems.splice(this.newsItems.indexOf(newsItem), 1);
        this.newsItems.push(addedNewsItem);
        this.events.publish(EventChannels.CHANNEL_NEWS_ITEM_CREATED, addedNewsItem);
      });
  }
}
