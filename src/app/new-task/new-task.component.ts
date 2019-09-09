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

  constructor(private taskServiceService : TaskServiceService, private listService : ListServiceService) { 
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
  tomorrow : Date
  today : Date

  ngOnInit() {
    this.today = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.today.getDate()+1);
    this.date.setValue(this.tomorrow)
  }

  onSubmit(data) {
    console.log('Your order has been submitted', data);
    this.taskServiceService.add_new_task(data).subscribe( res => {
      console.log(res);
      this.listService.refresh_page()
    })
    this.new_task.reset();
  }

}
