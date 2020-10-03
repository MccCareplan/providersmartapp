import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {GoalsDataService} from '../services/goals-data-service.service';

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrls: ['./blood-pressure.component.css']
})
export class BloodPressureComponent implements OnInit {

  vitalSignsDataSource = this.dataservice.vitalSignsDataSource;

  constructor(public dataservice: DataService, public goalsdataservice: GoalsDataService) { }
  displayedColumns = ['date', 'systolic', 'diastolic'];

  ngOnInit(): void {
  }

  refreshVitalSigns = () => {
    this.vitalSignsDataSource = this.dataservice.vitalSignsDataSource;
  }

}
