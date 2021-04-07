import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GoalSummary } from '../generated-data-api';
import { reformatYYYYMMDD } from '../util/utility-functions';
import moment from 'moment';

@Component({
  selector: 'app-consolidated-goals',
  templateUrl: './consolidated-goals.component.html',
  styleUrls: ['./consolidated-goals.component.css']
})
export class ConsolidatedGoalsComponent implements OnInit, AfterViewInit {
  consolidatedGoalsDataSource: MatTableDataSource<GoalSummary>;

  constructor(public dataService: DataService) {
  }

  displayedColumns = ['rank', 'lfcstatus', 'description', 'created', 'targetdate', 'status', 'acceptance', 'expressedby', 'expressedbytype'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.consolidatedGoalsDataSource = this.dataService.consolidatedGoalsDataSource;
  }

  ngAfterViewInit(): void {
    this.consolidatedGoalsDataSource.paginator = this.paginator;
    this.consolidatedGoalsDataSource.sort = this.sort;
    this.consolidatedGoalsDataSource.sortingDataAccessor = (data: GoalSummary, header: string) => {
      switch (header) {
        case ('status'): {
          return data.achievementStatus.text;
        }
        case ('priority'): {
          if (data.priority.toLowerCase() === 'undefined') {
            return 'low-priority';
          } else {
            return data[header];
          }
        }
        case ('startDateText'): {
          return moment(data[header]).unix();
        }
        case ('targetDateText'): {
          return moment(data[header]).unix();
        }
        case ("achievementStatus"): {
          return data[header].text;
        }
        default: {
          return data[header];
        }
      }
    };
  }
}
