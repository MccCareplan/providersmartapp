import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-patient-goals',
  templateUrl: './patient-goals.component.html',
  styleUrls: ['./patient-goals.component.css']
})
export class PatientGoalsComponent implements OnInit {

  constructor(public dataservice: DataService) { }

  displayedColumns = ['rank', 'description'];
  ngOnInit(): void {
  }

}
