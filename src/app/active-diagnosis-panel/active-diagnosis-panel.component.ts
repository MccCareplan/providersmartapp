import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DiagnosisDialogComponent} from '../diagnosis-dialog/diagnosis-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-active-diagnosis-panel',
  templateUrl: './active-diagnosis-panel.component.html',
  styleUrls: ['./active-diagnosis-panel.component.css']
})
export class ActiveDiagnosisPanelComponent implements OnInit {
  private route: ActivatedRoute;
  private router: Router;
  constructor(public dataservice: DataService, private dialog: MatDialog, private rt: ActivatedRoute, private rtr: Router) {
    this.route = rt;
    this.router = rtr;
  }

  displayedColumns = ['checked', 'name', 'rxfilter', 'trend', 'date'];

  /* dataSource = DIAGNOISIS_DATA; */
  ngOnInit(): void {
  }

  onRowClicked(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '700px';
    dialogConfig.data = {
      name: this.dataservice.demographic.name,
      condition: row.code.text,
      history: row.history
    };
    this.dialog.open(DiagnosisDialogComponent, dialogConfig);
  }

  switchToHM(code: string) {
    // console.log('Switch to Health Maintenance icon clicked. code=', code);
    this.router.navigate(['/maint'], { queryParamsHandling: 'merge' });
  }

  switchToHS(code: string) {
    // console.log('Switch to Health Status icon clicked. code=', code);
    this.router.navigate(['/status'], { queryParamsHandling: 'merge' });
  }


}

/*
export interface Diagnosis {
  checked: boolean;
  name: string;
  date: string;
  highlighted?: boolean;
  hovered?: boolean;
}

const DIAGNOISIS_DATA: Diagnosis[] = [
  {checked: false, name: 'Chronic Kidney Disease', date: '04/26/2015' },
  {checked: false, name: 'Diabetes', date: '12/13/2015' }
]
*/
