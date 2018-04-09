import {Component, OnDestroy, OnInit} from '@angular/core';
import {Events, NavController, Refresher, ToastController} from "ionic-angular";
import {NewsItemDetailComponent} from "../news-item-detail/news-item-detail.component";
import {NewsItem} from "../../providers";
import {EventChannels} from "../../core/constants/event-channels";
import {NewsItemFacade} from "../../core/facade/news-item.facade";

@Component({
  selector: 'app-news-items',
  templateUrl: './news-items.component.html'
})
export class NewsItemsComponent implements OnInit , OnDestroy{

  private refresher: Refresher;

  constructor(private newsItemsFacade: NewsItemFacade,
              private events: Events,
              private toastCtrl: ToastController,
              private navCtrl: NavController) {
    this.events.subscribe(EventChannels.CHANNEL_NEWS_ITEMS_HIDE_REFRESHER,()=>{
      if (this.refresher) {
        this.refresher.complete();
      }
    });

    this.events.subscribe(EventChannels.CHANNEL_NEWS_ITEM_DELETED, (isDeleted: boolean)=>{
      this.showToast("News item verwijderd", 2000);
    });
  }

  ngOnInit(): void {
    this.newsItemsFacade.loadNewsItems();
  }

  ngOnDestroy(): void{
    this.events.unsubscribe(EventChannels.CHANNEL_NEWS_ITEMS_HIDE_REFRESHER);
    this.events.unsubscribe(EventChannels.CHANNEL_NEWS_ITEM_DELETED);
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

  private showToast(message: string, duration: number){
    const toast = this.toastCtrl.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
