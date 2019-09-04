import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoneComponent } from './done/done.component';
import { ToDosComponent } from './to-dos/to-dos.component';


const routes: Routes = [
  {
    path: 'done',
    component: DoneComponent
  },
  {
    path: 'my-lists',
    children: 
    [
      {
        path: '**',
        component: ToDosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
