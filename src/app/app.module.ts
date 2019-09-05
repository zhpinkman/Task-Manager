import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoneComponent } from './done/done.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TaskComponent } from './task/task.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { OtherListsComponent } from './other-lists/other-lists.component';
import { MainListComponent } from './main-list/main-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    DoneComponent,
    TaskComponent,
    OtherListsComponent,
    MainListComponent
  ],
  imports: [
    HttpClientModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
