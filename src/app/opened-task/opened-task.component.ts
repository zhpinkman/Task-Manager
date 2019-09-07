import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../classes/Task';

@Component({
  selector: 'app-opened-task',
  templateUrl: './opened-task.component.html',
  styleUrls: ['./opened-task.component.scss']
})
export class OpenedTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OpenedTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
