import { Component, OnInit } from '@angular/core';
import { ListServiceService } from '../services/list-service.service';
import { Task } from '../classes/Task';
import { List } from '../classes/List';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-done',
  templateUrl: '../other-lists/other-lists.component.html',
  styleUrls: ['../other-lists/other-lists.component.scss']
})
export class DoneComponent implements OnInit {

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
  }
  
  ngOnInit() {
    this.editing_mode = false
    this.listService.current_list_title = "Compeleted"
    this.listService.is_done = true
    console.log("shit");
    this.get_lists()
    this.get_compeleted_tasks()
  }
  create_list(list) {
    this.listService.create_folder(list).subscribe( res => {
      this.lists.push(new List(list.title))
      this.title.setValue("")
      this.go_to_list(list.title)
    })
  }
  
   get_compeleted_tasks(){
     this.taskService.get_compeleted_tasks().subscribe(data =>
      {
        this.tasks = data
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


  go_to_list(title : string) {
    this.listService.get_list(title)
  }

}
