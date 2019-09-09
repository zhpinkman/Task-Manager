import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '../classes/List';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Router} from "@angular/router"
import { Task } from '../classes/Task';



@Injectable({
  providedIn: 'root'
})
export class ListServiceService {
  constructor(private http: HttpClient, private router : Router) { }
  current_list : string

  get_all_lists() : Observable<List[]> {
    return this.http.get<List[]>('http://localhost:3000/api/lists')
  }

  get_list(title : string) {
    if (title == "Daily Tasks"){
      this.router.navigate(['mainList'])
      console.log("daily list");
    }
    else if (title == "compeleted"){
      this.router.navigate(['done'])
      console.log('done list')
    }
    else{
      console.log(title)
      this.router.navigate([title])
    }
  }

  update_current_list() {
    let x = this.router.url
    let y = x.substr(1,x.length)
    let i = y.indexOf('/')
    if (i == -1){
      i = y.length
      this.current_list = y.substr(0, i)
    }
    else  
      this.go_to_mainList()
  }

  go_to_mainList() {
    this.router.navigate(['mainList'])
  }

  get_tasks_of_list(list : List) : Observable<Task[]>{
    return this.http.get<Task[]>(`http://localhost:3000/api/tasks/query/${list._id}`);
  }

  get_main_list(): Observable<List> {
    return this.http.get<List>(`http://localhost:3000/api/MainList`);
  }
}
