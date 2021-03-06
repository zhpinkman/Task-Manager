import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../classes/Task';
import { TaskServiceService } from '../services/task-service.service';
import { ListServiceService } from '../services/list-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-opened-task',
  templateUrl: './opened-task.component.html',
  styleUrls: ['./opened-task.component.scss']
})
export class OpenedTaskComponent implements OnInit {

  constructor(private taskService : TaskServiceService,
    private listService : ListServiceService,
    public dialogRef: MatDialogRef<OpenedTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task) {
      dialogRef.beforeClosed().subscribe(data => {
      })
      this.title = new FormControl('')
      this.description = new FormControl('')
      this.date = new FormControl('')
      this.task_form = new FormGroup({
        title : this.title,
        description : this.description,
        date : this.date
      })
    }

    ngOnDestroy(){
      this.dialogRef.close(this.task_form.value)
    }


  title : FormControl
  description : FormControl
  date : FormControl
  task_form : FormGroup

  ngOnInit() {
    this.date.setValue(this.task.date)
  }

  task_done(){
    this.task.done = true
    this.taskService.update_task(this.task)
    .subscribe(res => {
      this.taskService.delete_task_from_list(this.task)
      this.dialogRef.close()
    })
  }

  move_task_to_daily(){
    this.listService.get_main_list()
    .subscribe(main_list => {
      this.task.list = main_list
      this.taskService.update_task(this.task)
      .subscribe(res => {
        this.taskService.delete_task_from_list(this.task)
        this.dialogRef.close()
      })
    })
  }

  delete_task(){
    this.taskService.delete_task(this.task)
    .subscribe(res => {
      this.taskService.delete_task_from_list(this.task)
      this.dialogRef.close()
    })
  }

}
