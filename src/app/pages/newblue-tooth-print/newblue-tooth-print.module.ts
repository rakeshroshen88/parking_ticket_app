import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewblueToothPrintPageRoutingModule } from './newblue-tooth-print-routing.module';

import { NewblueToothPrintPage } from './newblue-tooth-print.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewblueToothPrintPageRoutingModule
  ],
  declarations: [NewblueToothPrintPage]
})
export class NewblueToothPrintPageModule {}
