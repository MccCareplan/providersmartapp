import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConditionHistory} from '../generated-data-api';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-medication-dialog',
  templateUrl: './goal-dialog.component.html',
  styleUrls: ['./goal-dialog.component.css']
})
export class GoalDialogComponent implements OnInit {




  displayedColumns: string[] = ['lifecycleStatus', 'description', 'achievementStatus'];
  lifecycleStatus: string;
  description: string;
  achievementStatus: string;



  constructor(private dialogRef: MatDialogRef<GoalDialogComponent>,
              @Inject(MAT_DIALOG_DATA)  goal: { lifecycleStatus: string,description:string,achievementStatus:string}) {


    this.lifecycleStatus= goal.lifecycleStatus;
    this.description= goal.description;
    this.achievementStatus= goal.achievementStatus;


  }

  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource(this.history);
  }

  close() {
    this.dialogRef.close();
  }

}
