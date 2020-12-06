import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarcodeGeneratorPage } from './barcode-generator.page';

const routes: Routes = [
  {
    path: '',
    component: BarcodeGeneratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarcodeGeneratorPageRoutingModule {}
