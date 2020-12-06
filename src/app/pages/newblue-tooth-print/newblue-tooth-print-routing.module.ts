import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewblueToothPrintPage } from './newblue-tooth-print.page';

const routes: Routes = [
  {
    path: '',
    component: NewblueToothPrintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewblueToothPrintPageRoutingModule {}
