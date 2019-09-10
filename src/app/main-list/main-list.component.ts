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
  
  on_submit(data) {
    this.listService.create_folder(data).subscribe( res => {
      console.log(res)
      this.listService.refresh_page()
    })
  }
  

  ngOnInit() {
    this.listService.current_list_title = "Daily Tasks"
    this.listService.is_done = false
    this.get_lists()
    this.get_main_list()
  }

  constructor(public listService : ListServiceService, private taskService : TaskServiceService) {
    this.title = new FormControl('')
    this.list = new FormGroup({
      title : this.title
    })
    this.taskService.task_deleted.subscribe(task => {
      console.log(task);
      this.tasks.splice(this.tasks.indexOf(task), 1);
    })
    this.taskService.task_added.subscribe(task => {
      this.tasks.push(task)
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
      this.lists.push(new List('compeleted'))
    })
  }

  get_tasks_of_list(list : List){
    console.log(list);
    this.listService.get_tasks_of_list(list)
    .subscribe(data => {
      this.tasks = data.filter(item => item.done === false)
      console.log(data);
      console.log(this.tasks);
    })
  }


  go_to_list(title : string) {
    this.listService.get_list(title)
  }
}
