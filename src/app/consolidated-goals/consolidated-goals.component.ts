import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {GoalSummary} from '../generated-data-api';
import {reformatYYYYMMDD} from '../../utility-functions';

@Component({
  selector: 'app-consolidated-goals',
  templateUrl: './consolidated-goals.component.html',
  styleUrls: ['./consolidated-goals.component.css']
})
export class ConsolidatedGoalsComponent implements OnInit, AfterViewInit {
  consolidatedGoalsDataSource: MatTableDataSource<GoalSummary> = this.dataService.consolidatedGoalsDataSource;

  constructor(public dataService: DataService) {
  }

  displayedColumns = ['rank', 'lfcstatus', 'description', 'created', 'targetdate', 'status', 'expressedby', 'expressedbytype'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.consolidatedGoalsDataSource.paginator = this.paginator;
    this.consolidatedGoalsDataSource.sort = this.sort;
    this.consolidatedGoalsDataSource.sortingDataAccessor = (data: GoalSummary, header: string) => {
      switch (header) {
        case ('status'): {
          return data.achievementStatus.text;
          break;
        }
        case ('priority'): {
          if (data.priority.toLowerCase() === 'undefined') {
            return 'low-priority';
          } else {
            return data[header];
          }
          break;
        }
        case ('startDateText' ): {
          return reformatYYYYMMDD(data[header]);
          break;
        }
        case ('targetDateText'): {
          return reformatYYYYMMDD(data[header]);
          break;
        }
        default: {
          return data[header];
        }
      }
    };
    const sortState: Sort = {active: 'priority', direction: 'asc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);

  }
}
