import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page'; 
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CarDetailsComponent } from '../car-details/car-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NgxQRCodeModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage, CarDetailsComponent]
})
export class DashboardPageModule {}
