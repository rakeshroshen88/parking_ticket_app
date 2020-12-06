import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodeGeneratorPageRoutingModule } from './barcode-generator-routing.module';

import { BarcodeGeneratorPage } from './barcode-generator.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    BarcodeGeneratorPageRoutingModule
  ],
  declarations: [BarcodeGeneratorPage]
})
export class BarcodeGeneratorPageModule {}
