import { Injectable } from '@angular/core';
import { ListServiceService } from './list-service.service';
import { Task } from '../classes/Task';
import {Router} from "@angular/router"
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  task_deleted = new Subject<Task>()
  task_added = new Subject<Task>()

  constructor(private listService : ListServiceService, private http: HttpClient, private router : Router) { }

  add_new_task(data) {
    let task = new Task(data.title, data.description, this.listService.current_list, data.date)
    // console.log(task);
    return this.http.post<Task>('http://localhost:3000/api/tasks', task)
  }

  get_compeleted_tasks() : Observable<Task[]>{
    return this.http.get<Task[]>('http://localhost:3000/api/compeleted')
  }

  delete_task(task : Task) : Observable<any>{
    // console.log("here");
    return this.http.delete(`http://localhost:3000/api/tasks/${task._id}`)
  }
  
  update_task(task : Task) : Observable<any>{
    return this.http.put(`http://localhost:3000/api/tasks/${task._id}`, task)
  }

  delete_task_from_list(task : Task){
    this.task_deleted.next(task)
  }

  add_task_to_list(task : Task){
    this.task_added.next(task)
  }
}
