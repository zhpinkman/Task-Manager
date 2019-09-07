import { Component, OnInit, Input, Inject} from '@angular/core';
import { Task } from '../classes/Task';
import { TaskServiceService } from '../services/task-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { OpenedTaskComponent } from '../opened-task/opened-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input('value')
  task: Task;
  constructor(private taskService : TaskServiceService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const opts = new MatDialogConfig();
    const dialogRef = this.dialog.open(OpenedTaskComponent, {
      data: this.task,
      panelClass: 'my-centered-dialog',
      width: '400px'
    });
    dialogRef.updatePosition(opts.position);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  mouse_on_task : boolean = false

  hover_on(){
    this.mouse_on_task = true
  }
  hover_off(){
    this.mouse_on_task = false
  }

  task_done(){
    // todo
  }
}
