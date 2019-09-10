import { Component, OnInit } from '@angular/core';
import { Task } from '../classes/Task';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskServiceService } from '../services/task-service.service';
import { ListServiceService } from '../services/list-service.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService : TaskServiceService, private listService : ListServiceService) { 
    this.title = new FormControl('')
    this.description = new FormControl('')
    this.date = new FormControl('')
    this.new_task = new FormGroup({
      title : this.title,
      description : this.description,
      date : this.date
    })
    console.log("I'm here");
  }

  task : Task
  title : FormControl
  description : FormControl
  date : FormControl
  new_task : FormGroup
  tomorrow : Date
  today : Date

  ngOnInit() {
    this.today = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.today.getDate()+1);
    this.date.setValue(this.tomorrow)
  }

  onSubmit(task) {
    console.log(task.date);
    console.log('Your order has been submitted', task);
    this.taskService.add_new_task(task).subscribe( res => {
      console.log(res);
      // this.listService.refresh_page()
      this.taskService.add_task_to_list(task)
    })
    this.new_task.reset();
  }

  handle_space(event) {
    console.log("space");
    if (event.keyCode === 32) {
      event.stopPropagation();
    }
   }
}
