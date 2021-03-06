import { Component, OnInit } from '@angular/core';
import { ListServiceService } from '../services/list-service.service';
import { Task } from '../classes/Task';
import { List } from '../classes/List';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-main-list',
  templateUrl: '../other-lists/other-lists.component.html',
  styleUrls: ['../other-lists/other-lists.component.scss']
})
export class MainListComponent implements OnInit {

  tasks : Task[] = []
  lists : List[] = []
  main_list : List
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
  }

  ngOnInit() {
    this.editing_mode = false
    this.listService.current_list_title = "Daily Tasks"
    this.listService.is_done = false
    this.get_lists()
    this.get_main_list()
  }
  
  create_list(list) {
    this.listService.create_folder(list).subscribe( res => {
      this.lists.push(new List(list.title))
      this.title.setValue("")
      this.go_to_list(list.title)

    })
  }
  

 

  

   get_main_list(){
     this.listService.get_main_list().subscribe(data =>
      {
        this.main_list = data
        this.listService.current_list = data
        this.get_tasks_of_list(this.main_list)
      }
     )
   }

  get_lists() {
    this.listService.get_all_lists()
    .subscribe(_lists => {
      this.lists = _lists
      this.listService.lists = this.lists
      this.lists.push(new List('Compeleted'))
    })
  }

  get_tasks_of_list(list : List){
    this.listService.get_tasks_of_list(list)
    .subscribe(data => {
      this.tasks = data.filter(item => item.done === false)
    })
  }

  go_to_list(title : string) {
    this.listService.get_list(title)
  }
}
