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
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {MatDialogModule} from '@angular/material/dialog';
import { OpenedTaskComponent } from './opened-task/opened-task.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material'
import { NewTaskComponent } from './new-task/new-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';









@NgModule({
  declarations: [
    AppComponent,
    DoneComponent,
    TaskComponent,
    OtherListsComponent,
    MainListComponent,
    OpenedTaskComponent,
    NewTaskComponent
  ],
  imports: [
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    AngularFontAwesomeModule,
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
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent],
  entryComponents:[OpenedTaskComponent]
})
export class AppModule { }
