import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../classes/Task';
import { TaskServiceService } from '../services/task-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input('value')
  task: Task;
  constructor(private taskService : TaskServiceService) { }

  ngOnInit() {
  }

}
