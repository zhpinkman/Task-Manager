import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { ListServiceService } from '../services/list-service.service';
import { Task } from '../classes/Task';
import { List } from '../classes/List';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { element } from 'protractor';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-other-lists',
  templateUrl: './other-lists.component.html',
  styleUrls: ['./other-lists.component.scss']
})
export class OtherListsComponent implements OnInit {


  ngOnInit() {
    this.listService.is_done = false
    console.log("init");
    this.listService.update_current_list()
    this.get_lists_and_tasks();
  }

  get_tasks() {
    this.listService.lists = this.lists
    console.log(this.lists);
    let list = this.listService.get_list_from_lists()
    if (list === null)
      this.go_to_list('Daily Tasks')
    this.listService.current_list = list
    this.get_tasks_of_list(list)
  }

  get_tasks_of_list(list : List){
    console.log(list);
    this.listService.get_tasks_of_list(list)
    .subscribe(data => {
      this.tasks = data.filter(items => items.done === false)
      console.log(data);
      console.log(this.tasks);
    })
  }

  tasks : Task[] = []
  lists : List[] = []
  list : FormGroup
  title : FormControl
  
  on_submit(data) {
    console.log(data);
    this.listService.create_folder(data).subscribe( res => {
      console.log(res)
      this.listService.refresh_page()
    })
  }

  constructor(public listService : ListServiceService) {
    console.log("constructor");
    this.title = new FormControl('')
    this.list = new FormGroup({
      title : this.title
    })
  }


  get_lists_and_tasks() {
    this.listService.get_all_lists()
    .subscribe(_lists => {
      this.lists = _lists
      console.log(this.lists);
      this.lists.push(new List('compeleted'))
      this.get_tasks()
    })
  }

  go_to_list(title : string) {
    this.listService.get_list(title)
    // window.location.reload()
  }
}
