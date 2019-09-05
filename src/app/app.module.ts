import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoneComponent } from './done/done.component';
import { ToDosComponent } from './to-dos/to-dos.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    DoneComponent,
    ToDosComponent,
    TaskComponent
  ],
  imports: [
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
