import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '../classes/List';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {Router} from "@angular/router"
import { Task } from '../classes/Task';



@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  refresh_page = new Subject<string>()

  constructor(private http: HttpClient, private router : Router) { }
  current_list_title : string
  current_list : List
  lists : List[]
  is_done : boolean

  get_all_lists() : Observable<List[]> {
    return this.http.get<List[]>('http://localhost:3000/api/lists')
  }

  get_list(title : string) {
    if (title == "Daily Tasks"){
      this.is_done = false
      this.router.navigate(['mainList'])
      console.log("daily list");
    }
    else if (title == "Compeleted"){
      this.is_done = true
      this.router.navigate(['done'])
      console.log('done list')
    }
    else{
      this.is_done = false
      console.log(title)
      this.router.navigate([title])
      this.refresh_page.next()
    }
  }

  get_list_from_lists() : List{
    let list : List
    console.log(this.lists.length);
    for (let i  = 0; i < this.lists.length; i++){
      console.log(this.lists[i].title + " " + this.current_list_title);
      if (this.lists[i].title == this.current_list_title){
        console.log(this.lists[i]);
        return this.lists[i]
      } 
    }
    console.log("nothing found");
    return null
  }

  update_current_list() {
    let x = this.router.url
    let y = x.substr(1,x.length)
    let i = y.indexOf('/')
    if (i == -1){
      i = y.length
      this.current_list_title = y.substr(0, i)
      console.log(this.current_list_title);
    }
    else  
      this.go_to_mainList()
  }

  create_folder(data) : Observable<List> {
    let list = new List(data.title)
    console.log(list);
    return this.http.post<List>('http://localhost:3000/api/lists', list)
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

  delete_current_list() : Observable<any> {
    return this.http.delete(`http://localhost:3000/api/lists/${this.current_list._id}`)
  }

  update_list(list : List) : Observable<any>{
    return this.http.put(`http://localhost:3000/api/lists/${list._id}`, list)
  }
}
