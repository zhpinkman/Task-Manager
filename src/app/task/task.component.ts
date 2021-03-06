import { Component, OnInit, Input, Inject} from '@angular/core';
import { Task } from '../classes/Task';
import { TaskServiceService } from '../services/task-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { OpenedTaskComponent } from '../opened-task/opened-task.component';
import { ListServiceService } from '../services/list-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input('value')
  task: Task;
  constructor(private taskService : TaskServiceService, public dialog: MatDialog, private listService : ListServiceService) { }

  ngOnInit() {
  }

  dialogRef : any

  openDialog(): void {
    const opts = new MatDialogConfig();
    const dialogRef = this.dialog.open(OpenedTaskComponent, {
      data: this.task,
      panelClass: 'my-centered-dialog',
      width: '400px'
    });
    this.dialogRef = dialogRef
    dialogRef.updatePosition(opts.position);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.task.title = result.title
      this.task.description = result.description
      this.task.date = result.date
      this.update_task()
    });
  }

  update_task(){
    this.taskService.update_task(this.task)
    .subscribe(res => {
    })
  }

  mouse_on_task : boolean = false

  hover_on(){
    this.mouse_on_task = true
  }
  hover_off(){
    this.mouse_on_task = false
  }

  task_done(){
    this.task.done = true
    this.taskService.update_task(this.task)
    .subscribe(res => {
      this.taskService.delete_task_from_list(this.task)
      this.dialog.closeAll()
    })
  }

  move_task_to_daily(){
    this.listService.get_main_list()
    .subscribe(main_list => {
      this.task.list = main_list
      this.taskService.update_task(this.task)
      .subscribe(res => {
        this.taskService.delete_task_from_list(this.task)
        this.dialog.closeAll()
      })
    })
  }

  delete_task(){
    this.taskService.delete_task(this.task)
    .subscribe(res => {
      this.taskService.delete_task_from_list(this.task)
      this.dialog.closeAll()
    })
  }
}
