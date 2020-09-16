import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-clinical-goals',
  templateUrl: './clinical-goals.component.html',
  styleUrls: ['./clinical-goals.component.css']
})
export class ClinicalGoalsComponent implements OnInit {

  constructor(public dataservice: DataService) { }
  displayedColumns = ['rank', 'description', 'created', 'targetdate', 'status'];
  ngOnInit(): void {
  }

}
