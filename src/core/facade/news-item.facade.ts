import {Injectable, OnInit} from '@angular/core';
import {NewsItemService} from '../service/news-item.service';
import {NewsItem} from '../../providers/index';
import {Events} from "ionic-angular";
import {EventChannels} from "../constants/event-channels";

@Injectable()
export class NewsItemFacade implements OnInit {

  newsItems: NewsItem[] = [];
  currentNewsItem: NewsItem;

  constructor(private newsItemService: NewsItemService, private events: Events) {

  }

  ngOnInit(): void {
  }

  loadNewsItems(): void {
    this.newsItemService.getNewsItems()
      .map(value => {
        this.events.publish(EventChannels.CHANNEL_NEWS_ITEMS_HIDE_REFRESHER);
        return value;
      })
      .subscribe((loadedNewsItems: NewsItem[]) => this.newsItems = loadedNewsItems);
  }

  verwijderNewsItem(newsItem: NewsItem) {
    this.newsItems.splice(this.newsItems.indexOf(newsItem, 1));
    this.newsItemService.deleteNewsItem(newsItem)
      .subscribe((isDeleted: boolean) => {
        if (!isDeleted) {
          this.newsItems.push(newsItem);
        } else {
          console.log("Deleted newsItem: ", newsItem);
        }
      });
  }

  saveNewsItem(newsItem: NewsItem) {
    this.newsItemService.saveNewsItem(newsItem)
      .subscribe((isSaved: boolean) => {
        if(isSaved) {
          console.log("Saved newsItem");
        } else{
          console.log('Failed to save newsitem');
        }
      });
  }

  addNewsItem(newsItem: NewsItem) {
    this.newsItemService.addNewsItem(newsItem)
      .subscribe((addedNewsItem: NewsItem) => {
        console.log("Added newsItem: ", addedNewsItem);
        this.newsItems.splice(this.newsItems.indexOf(newsItem), 1);
        this.newsItems.push(addedNewsItem);
      });
  }
}
