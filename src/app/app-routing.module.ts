import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoneComponent } from './done/done.component';
import { OtherListsComponent } from './other-lists/other-lists.component';
import { MainListComponent} from './main-list/main-list.component'


const routes: Routes = [
  {
    path : 'done',
    component : DoneComponent
  },
  {
    path : 'mainList',
    component : MainListComponent
  },
  {
    path : '**',
    component : OtherListsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
