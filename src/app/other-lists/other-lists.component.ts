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
    this.listService.get_current_list()
    this.get_lists();
    this.get_tasks();
  }

  get_tasks() {
    let list : List
    for (let i  = 0; i < this.lists.length; i++)
      if (this.lists[i].title == "test")
        list = this.lists[i]
    for (let index = 0; index < 10; index++) {
      let task = new Task("title", "description description descriptiondescriptiondescriptiondescription descriptiondescription description description", list)
      this.tasks.push(task)
    }
  }

  tasks : Task[] = []
  lists : List[] = []

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);


  constructor(public listService : ListServiceService) {}


  get_lists() {
    this.listService.get_all_lists()
    .subscribe(_lists => this.lists = _lists)
    console.log(this.lists);
  }

  list_routing_handler(title : string) {
    this.listService.list_handler(title)
  }
}
