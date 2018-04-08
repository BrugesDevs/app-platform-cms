import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsItemService} from '../../service/news-item.service';
import {Location} from '@angular/common';
import {NewsItem} from '../../providers';

@Component({
  selector: 'news-item-detail',
  templateUrl: './news-item-detail.component.html',
  styleUrls: ['./news-item-detail.component.css']
})
export class NewsItemDetailComponent implements OnInit, OnDestroy {

  @ViewChild('saveButton') saveButton;

  saveButtonText: string;
  newsItem: NewsItem;

  constructor(private route: ActivatedRoute,
              private newsItemService: NewsItemService,
              private location: Location) {
  }

  ngOnInit() {
    this.newsItem = new NewsItem();
    this.getNewsItem();
  }

  ngOnDestroy(): void {
    this.save();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.newsItem.id) {
      this.newsItemService.saveNewsItem(this.newsItem);
    } else {
      this.newsItemService.addNewsItem(this.newsItem);
    }
  }

  private getNewsItem() {
    this.route.params.subscribe(params => {
      var id = params['id'];

      this.saveButtonText = id ? 'save' : 'voeg toe';

      if (id) {
        this.newsItemService.getNewsItem(id)
          .subscribe(value => {this.newsItem = value;});
      } else {
        this.newsItem = new NewsItem();
      }
    });
  }
}
