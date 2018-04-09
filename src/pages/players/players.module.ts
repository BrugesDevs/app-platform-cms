import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Players } from './players';

@NgModule({
  declarations: [
    Players,
  ],
  imports: [
    IonicPageModule.forChild(Players),
  ],
})
export class PlayersModule {}
