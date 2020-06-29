import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-education-panel',
  templateUrl: './education-panel.component.html',
  styleUrls: ['./education-panel.component.css']
})
export class EducationPanelComponent implements OnInit {

  constructor(public dataService: DataService) { }
  displayedColumns = ['topic', 'date', 'assessment'];

  ngOnInit(): void {
  }

}
