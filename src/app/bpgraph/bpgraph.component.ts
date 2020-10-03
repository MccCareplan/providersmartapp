import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {DataService} from '../services/data.service';


@Component({
  selector: 'app-bpgraph',
  templateUrl: './bpgraph.component.html',
  styleUrls: ['./bpgraph.component.css']
})
export class BPGraphComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    { data: [
        {
          x: new Date('2016-12-12T00:00:00Z'),
          y: 155
        },
        {
          x: new Date('2017-01-10T00:00:00Z'),
          y: 147
        },
        {
          x: new Date('2017-02-11T00:00:00Z'),
          y: 147
        },
        {
          x: new Date('2017-03-11T00:00:00Z'),
          y: 155
        },
        {
          x: new Date('2017-04-23T00:00:00Z'),
          y: 155
        },
        {
          x: new Date('2017-05-21T00:00:00Z'),
          y: 155
        }],
      label: 'Systolic', fill: false},
    { data: [
        {
          x: new Date('2016-12-12T00:00:00Z'),
          y: 91
        },
        {
          x: new Date('2017-01-10T00:00:00Z'),
          y: 91
        },
        {
          x: new Date('2017-02-11T00:00:00Z'),
          y: 89
        },
        {
          x: new Date('2017-03-11T00:00:00Z'),
          y: 90
        },
        {
          x: new Date('2017-04-23T00:00:00Z'),
          y: 89
        },
        {
          x: new Date('2017-05-21T00:00:00Z'),
          y: 102
        }],      label: 'Diastolic', fill: false},
  ];

  lineChartLabels: Label[] = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

  lineChartOptions = {
    responsive: false,
    maintainAspectRatio: true,
    scales: {
      yAxes: {
        ticks: {
          suggestedMax: 180
        }
      },
      xAxes: {
        type: 'time',
        ticks: {
          suggestedMin: new Date('2016-11-30'),
        },
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM D'
          },
          tooltipFormat: 'll MMM D'
        }
      }
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins =  [
    {
      annotation: {
        annotations: {
          drawTime: 'beforeDatasetsDraw',
          type: 'box',
          xScaleID: 'x-axis-0',
          yScaleID: 'y-axis-0',
          borderWidth: 0,
          yMin: 70,
          yMax: 130,
          backgroundColor: 'rgba(46, 204, 113,0.3)'
        }
      }
    }];
  lineChartType = 'line';

  constructor(public dataservice: DataService) {

  }

  ngOnInit(): void {



  }

}
