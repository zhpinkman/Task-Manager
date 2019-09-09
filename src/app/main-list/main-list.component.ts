import { Component, OnInit } from '@angular/core';
import { ListServiceService } from '../services/list-service.service';
import { Task } from '../classes/Task';
import { List } from '../classes/List';
import { FormControl, FormGroup } from '@angular/forms';

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
    this.get_lists()
    this.get_main_list()
  }

  constructor(public listService : ListServiceService) {
    this.title = new FormControl('')
    this.list = new FormGroup({
      title : this.title
    })
  }

  fillerContent = Array.from({length: 50}, () =>
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
   labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
   laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
   voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
   cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);


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
