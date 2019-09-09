import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { ListServiceService } from '../services/list-service.service';
import { Task } from '../classes/Task';
import { List } from '../classes/List';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { element } from 'protractor';

@Component({
  selector: 'app-other-lists',
  templateUrl: './other-lists.component.html',
  styleUrls: ['./other-lists.component.scss']
})
export class OtherListsComponent implements OnInit {

  ngOnInit() {
    this.valid_list = false
    this.listService.update_current_list()
    this.get_lists_and_tasks();
  }

  get_tasks() {
    let list : List
    console.log(this.lists.length);
    for (let i  = 0; i < this.lists.length; i++){
      console.log(this.lists[i].title + " " + this.listService.current_list);
      if (this.lists[i].title == this.listService.current_list){
        list = this.lists[i]
        this.valid_list = true
      } 
    }
    if (!this.valid_list)
      this.go_to_list("mainList")
    this.get_tasks_of_list(list)
    // for (let index = 0; index < 10; index++) {
    //   let task = new Task("title", "description description descriptiondescriptiondescriptiondescription descriptiondescription description description", list)
    //   this.tasks.push(task)
    // }
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

  valid_list : boolean
  tasks : Task[] = []
  lists : List[] = []

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);


  constructor(public listService : ListServiceService) {}


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
  }
}
