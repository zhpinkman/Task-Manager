import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoneComponent } from './done/done.component';
import { ToDosComponent } from './to-dos/to-dos.component';

@NgModule({
  declarations: [
    AppComponent,
    DoneComponent,
    ToDosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
