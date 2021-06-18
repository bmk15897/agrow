import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicElementsComponent } from './basic-elements/basic-elements.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WhatGrowComponent } from './what-grow/what-grow.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  { path: 'add-new-entry', component: BasicElementsComponent },
  { path: 'what-to-grow', component: WhatGrowComponent }
]

@NgModule({
  declarations: [BasicElementsComponent, WhatGrowComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(routes),
    NgbModule
  ]
})
export class FormModule { }
