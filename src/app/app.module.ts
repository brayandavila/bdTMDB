import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './components/components.module';
import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { CoreModule } from './core/core.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getEspañolPaginatorIntl } from './core/utils/es-paginator-intl';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ComponentsModule,
    LayoutsModule,
    PagesModule,
    CoreModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getEspañolPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
