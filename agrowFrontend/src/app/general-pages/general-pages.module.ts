import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes : Routes = [
  { path: 'maps', component: BlankPageComponent }
]

@NgModule({
  declarations: [BlankPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule
  ]
})
export class GeneralPagesModule { }
