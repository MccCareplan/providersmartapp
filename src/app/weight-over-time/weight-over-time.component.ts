import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Color} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {DataService} from '../services/data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {WotTableData} from '../datamodel/weight-over-time';
import {formatWotResult, reformatYYYYMMDD} from '../../utility-functions';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-weight-over-time',
  templateUrl: './weight-over-time.component.html',
  styleUrls: ['./weight-over-time.component.css']
})


export class WeightOverTimeComponent implements OnInit, AfterViewInit {
  wotDataSource: MatTableDataSource<WotTableData> = this.dataservice.wotDataSource;
  wotRowMax = 7;

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
    },
  ];
  lineChartLegend = false;
  lineChartPlugins =  [pluginAnnotations];
  lineChartType = 'line';

  constructor(public dataservice: DataService) {

  }

  displayedColumns = ['date', 'result'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // todo: fix below, paginator doesn't work when assigned, shows all rows, doesn't limit to max, paging doesn't work
    if (this.wotDataSource.data.length > this.wotRowMax) {
      this.wotDataSource.paginator = this.paginator;
    }
    this.wotDataSource.sort = this.sort;
    this.wotDataSource.sortingDataAccessor = (data: WotTableData, header: string) => {
      switch (header) {
        case ('result'): {
          return data.value;
        }

        case ('date' ): {
          return reformatYYYYMMDD(data.date);
        }

        default: {
          return data[header];
        }
      }
    };
    const sortState: Sort = {active: 'date', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  WotResult(wot: WotTableData): string {
    return formatWotResult(wot.value, wot.unit);
  }

  getWotRowCssClass(wot: WotTableData): string {
    let cssClass = '';
    const val = wot.value;
    if (val) {
      switch (true) {
        case (val >= 180):
          cssClass = 'resultBorderline';
          break;
        case (val < 180 && val >= 105):
          cssClass = 'resultGood';
          break;
        case (val < 105):
          cssClass = 'resultCritical';
          break;
        default:
          break;
      }
    }
    return cssClass;
  }


}
