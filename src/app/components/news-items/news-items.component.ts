import {Component, OnInit} from '@angular/core';
import {NewsItemFacade} from '../../facade/news-item.facade';

@Component({
  selector: 'app-news-items',
  templateUrl: './news-items.component.html',
  styleUrls: ['./news-items.component.css']
})
export class NewsItemsComponent implements OnInit {

  constructor(private newsItemsFacade: NewsItemFacade) {
  }

  ngOnInit(): void {
    this.newsItemsFacade.loadNewsItems();
  }
}
