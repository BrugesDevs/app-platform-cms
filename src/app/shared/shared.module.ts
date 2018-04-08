
import {NgModule} from '@angular/core';
import {LoadingSpinnerComponent} from '../components/loading-spinner/loading-spinner.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
    ],
  declarations: [
    LoadingSpinnerComponent
  ],
  exports: [
    LoadingSpinnerComponent
  ],
})
export class SharedModule { }
