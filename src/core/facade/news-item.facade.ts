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
    /*Optimistic revoval of item*/
    var index = this.newsItems.indexOf(newsItem, 0);
    if (index > -1) {
      this.newsItems.splice(index, 1);

      this.newsItemService.deleteNewsItem(newsItem)
        .subscribe((isDeleted: boolean) => {
          //TODO IF ITEM IS NOT DELETED FROM API PUSH IT BACK IN THE LIST
          // if (!isDeleted) {
          //   this.newsItems.push(newsItem);
          // }
          this.events.publish(EventChannels.CHANNEL_NEWS_ITEM_DELETED, newsItem);
        });
    } else {
      console.error("Inconsistent state while delete newsItem: ", newsItem);
    }
  }

  saveNewsItem(newsItem: NewsItem) {
    this.newsItemService.saveNewsItem(newsItem)
      .subscribe((isSaved: boolean) => {
        this.events.publish(EventChannels.CHANNEL_NEWS_ITEM_UPDATED, isSaved);
      });
  }

  addNewsItem(newsItem: NewsItem) {
    this.newsItemService.addNewsItem(newsItem)
      .subscribe((addedId: number) => {
        newsItem.id = addedId;
        this.newsItems.push(newsItem);
        this.events.publish(EventChannels.CHANNEL_NEWS_ITEM_CREATED, newsItem);
      });
  }
}
