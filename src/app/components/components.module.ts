import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { NotDataComponent } from './not-data/not-data.component';
import { PlaceholderListComponent } from './placeholder-list/placeholder-list.component';



@NgModule({
  declarations: [
    ModalLoginComponent,
    NotDataComponent,
    PlaceholderListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalLoginComponent,
    NotDataComponent,
    PlaceholderListComponent
  ]
})
export class ComponentsModule { }
