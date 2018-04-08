import {NewsItemsComponent} from '../news-items/news-items.component';
import {NewsItemDetailComponent} from '../news-item-detail/news-item-detail.component';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    NewsItemDetailComponent,
    NewsItemsComponent
  ],
  exports: [
    NewsItemDetailComponent,
    NewsItemsComponent
  ],
})
export class ComponentModule {
}
