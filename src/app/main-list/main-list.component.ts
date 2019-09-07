import { Component, OnInit } from '@angular/core';
import { ListServiceService } from '../services/list-service.service';
import { Task } from '../classes/Task';
import { List } from '../classes/List';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent implements OnInit {

  tasks : Task[] = []
  lists : List[] = []

  ngOnInit() {
    this.listService.get_current_list()
    this.get_lists()
  }

  constructor(public listService : ListServiceService) {}

  fillerContent = Array.from({length: 50}, () =>
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
   labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
   laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
   voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
   cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);



  get_lists() {
    this.listService.get_all_lists()
    .subscribe(_lists => this.lists = _lists)
    console.log(this.lists)
  }

  list_routing_handler(title : string) {
    this.listService.list_handler(title)
  }
}
