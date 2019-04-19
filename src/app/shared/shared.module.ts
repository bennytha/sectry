import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DataserviceService } from './dataservice.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ]
})
export class SharedModule { }
