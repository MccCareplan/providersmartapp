import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {GoalsDataService} from '../services/goals-data-service.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrls: ['./blood-pressure.component.css']
})
export class BloodPressureComponent implements OnInit, AfterViewInit {

  vitalSignsDataSource = this.dataservice.vitalSignsDataSource;
  vitalSignsPageMax = 7;

  constructor(public dataservice: DataService, public goalsdataservice: GoalsDataService) {
  }
  displayedColumns = ['date', 'systolic', 'diastolic'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.vitalSignsDataSource.data.length > this.vitalSignsPageMax) {
      this.vitalSignsDataSource.paginator = this.paginator;
    }
  }


  refreshVitalSigns = () => {
    this.vitalSignsDataSource = this.dataservice.vitalSignsDataSource;
  }

}
