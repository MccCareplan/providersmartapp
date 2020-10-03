import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {GoalsDataService} from '../services/goals-data-service.service';

@Component({
  selector: 'app-clinical-test-results',
  templateUrl: './clinical-test-results.component.html',
  styleUrls: ['./clinical-test-results.component.css']
})
export class ClinicalTestResultsComponent implements OnInit {



  recentSystolicDate: string;
  recentSystolicReading: string;
  recentDiastolicDate: string;
  recentDiastolicReading: string;

  constructor(public dataservice: DataService) {
    console.log('in ClinicalTestResultsComponent onInit. this.dataservice.vitalSigns = ', this.dataservice.vitalSigns);
    if (this.dataservice.vitalSigns.mostRecentDiastolic.value) {
      this.recentSystolicDate = this.dataservice.vitalSigns.mostRecentSystolic.date;
      this.recentSystolicReading = this.dataservice.vitalSigns.mostRecentSystolic.value.toString();
    }
    if  (this.dataservice.vitalSigns.mostRecentDiastolic.value) {
      this.recentDiastolicDate = this.dataservice.vitalSigns.mostRecentDiastolic.date;
      this.recentDiastolicReading = this.dataservice.vitalSigns.mostRecentDiastolic.value.toString();
    }
  }

  ngOnInit(): void {
  }

}
