import {Injectable, OnInit} from '@angular/core';
import {NewsItemService} from '../service/news-item.service';
import {NewsItem} from '../providers';

@Injectable()
export class NewsItemFacade implements OnInit {

  newsItems: NewsItem[] = [];
  currentNewsItem: NewsItem;

  constructor(private newsItemService: NewsItemService) {

  }

  ngOnInit(): void {
  }

  loadNewsItems(): void {
    this.newsItemService.getNewsItems()
      .subscribe((loadedNewsItems: NewsItem[]) => this.newsItems = loadedNewsItems);
  }


}
