import { Injectable } from '@angular/core';
import { ListServiceService } from './list-service.service';
import { Task } from '../classes/Task';
import {Router} from "@angular/router"
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private listService : ListServiceService, private http: HttpClient, private router : Router) { }

  add_new_task(data) {
    let task = new Task(data.title, data.description, this.listService.current_list, data.date)
    return this.http.post<Task>('http://localhost:3000/api/tasks', task)
  }
}
