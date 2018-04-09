import {NewsItem, NewsItemControllerService} from '../../providers/index';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import "rxjs/add/operator/map";

@Injectable()
export class NewsItemService {

  constructor(private newsItemControllerService: NewsItemControllerService) {
  }

  addNewsItem(item: NewsItem): Observable<NewsItem> {
    return this.newsItemControllerService.createNewsItemUsingPOST(item)
      .map(value => {
        console.log('Added newsItem: ', value);
        return value;
      });
  }

  deleteNewsItem(item: NewsItem): Observable<boolean> {
    return this.newsItemControllerService.deleteNewsItemUsingDELETE(item.id)
      .map(value => {
        console.log('Deleted newsItem: ', value);
        return value;
      });
  }

  getNewsItem(id: number): Observable<NewsItem> {
    return this.newsItemControllerService.retrieveNewsItemUsingGET(id)
      .map(value => {
        console.log('Loaded newsItem: ', value);
        return value;
      });
  }

  getNewsItems(): Observable<NewsItem[]> {
    return this.newsItemControllerService.retrieveNewsItemsUsingGET()
      .map(values => {
        console.log('Loaded newsItems: ', values);
        return values;
      });
  }

  saveNewsItem(item: NewsItem): Observable<boolean> {
    return this.newsItemControllerService.updateNewsItemUsingPUT(item, item.id)
      .map(value => {
        console.log('Saved newsItem: ' + value);
        return value;
      });
  }

  filterOnName = (a, b) => {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    }
    return 0;
  };

}
