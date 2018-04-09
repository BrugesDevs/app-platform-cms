import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsItemFacade} from '../../core/facade/news-item.facade';
import {Events, NavController, Refresher} from "ionic-angular";
import {NewsItemDetailComponent} from "../news-item-detail/news-item-detail.component";
import {NewsItem} from "../../providers";
import {EventChannels} from "../../core/constants/event-channels";

@Component({
  selector: 'app-news-items',
  templateUrl: './news-items.component.html'
})
export class NewsItemsComponent implements OnInit , OnDestroy{

  private refresher: Refresher;

  constructor(private newsItemsFacade: NewsItemFacade,
              private events: Events,
              private navCtrl: NavController) {
    this.events.subscribe(EventChannels.CHANNEL_NEWS_ITEMS_HIDE_REFRESHER,()=>{
      if (this.refresher) {
        this.refresher.complete();
      }
    })
  }

  ngOnInit(): void {
    this.newsItemsFacade.loadNewsItems();
  }

  ngOnDestroy(): void{
    this.events.unsubscribe(EventChannels.CHANNEL_NEWS_ITEMS_HIDE_REFRESHER);
  }

  addNewsItem(){
    this.navCtrl.push(NewsItemDetailComponent);
  }

  doRefresh(refresher: Refresher) {
    console.log("Refresh newsitems ", refresher);
    this.refresher = refresher;
    this.newsItemsFacade.loadNewsItems();
  }

  bewerken(newsItem: NewsItem) {
    this.navCtrl.push(NewsItemDetailComponent, { NEWSITEM : newsItem});
  }

  verwijderen(newsItem: NewsItem) {
    this.newsItemsFacade.verwijderNewsItem(newsItem);
  }
}
