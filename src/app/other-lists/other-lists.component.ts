import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { ListServiceService } from '../services/list-service.service';
import { Task } from '../classes/Task';
import { List } from '../classes/List';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { element } from 'protractor';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskServiceService } from '../services/task-service.service';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-other-lists',
  templateUrl: './other-lists.component.html',
  styleUrls: ['./other-lists.component.scss']
})
export class OtherListsComponent implements OnInit {

  tasks : Task[] = []
  lists : List[] = []
  list : FormGroup
  title : FormControl
  editing_mode : boolean

  constructor(public listService : ListServiceService, private taskService : TaskServiceService) {
    this.title = new FormControl('')
    this.list = new FormGroup({
      title : this.title
    })
    this.taskService.task_deleted.subscribe(task => {
      this.tasks.splice(this.tasks.indexOf(task), 1);
    })
    this.taskService.task_added.subscribe(task => {
      this.tasks.push(task)
    })

    this.listService.refresh_page.subscribe(data => {
      this.get_lists_and_tasks();
    })
    this.editing_mode = false
  }


  ngOnInit() {
    this.listService.is_done = false
    this.listService.update_current_list()
    this.get_lists_and_tasks();
  }

  get_tasks() {
    this.listService.lists = this.lists
    let list = this.listService.get_list_from_lists()
    if (list === null)
      this.go_to_list('Daily Tasks')
    this.listService.current_list = list
    this.get_tasks_of_list(list)
  }

  get_tasks_of_list(list : List){
    this.listService.get_tasks_of_list(list)
    .subscribe(data => {
      this.tasks = data.filter(items => items.done === false)
    })
  }

  

  
  create_list(list) {
    this.listService.create_folder(list).subscribe( res => {
      this.lists.push(new List(list.title))
      this.title.setValue("")
      this.go_to_list(list.title)

    })
  }

  


  @ViewChild('title_input', {static: false})
  title_input : ElementRef<HTMLInputElement>;
  leave_edit_mode() {
    this.editing_mode = false
    let new_title = this.title_input.nativeElement.value
    let current_list = this.listService.current_list
    current_list.title = new_title
    this.listService.update_list(current_list)
    .subscribe(res => {
      this.listService.current_list_title = new_title
      this.go_to_list(new_title)
    })
  }
  
  
  enter_edit_mode() {
    this.editing_mode = true
  }


  get_lists_and_tasks() {
    this.listService.get_all_lists()
    .subscribe(_lists => {
      this.lists = _lists
      this.lists.push(new List('Compeleted'))
      this.get_tasks()
    })
  }

  go_to_list(title : string) {
    this.listService.current_list_title = title
    this.listService.get_list(title)
  }

  delete_list(){
    this.tasks.forEach(task => {
      this.taskService.delete_task(task)
      .subscribe(res => {
        this.taskService.delete_task_from_list(task)
      })
    });
    this.listService.delete_current_list()
    .subscribe(res => {
      this.go_to_list('Daily Tasks')
    })
  }
}
