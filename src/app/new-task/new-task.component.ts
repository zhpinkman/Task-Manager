import { Component, OnInit } from '@angular/core';
import { Task } from '../classes/Task';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor() { 
    this.title = new FormControl('')
    this.description = new FormControl('')
    this.date = new FormControl('')
    this.new_task = new FormGroup({
      title : this.title,
      description : this.description,
      date : this.date
    })
  }

  task : Task
  title : FormControl
  description : FormControl
  date : FormControl
  new_task : FormGroup

  ngOnInit() {
  }

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);
    this.new_task.reset();
  }

}
