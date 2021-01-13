import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { EgfrTableData } from '../datamodel/egfr';
import { formatEgfrResult } from '../../utility-functions';
import { ObservationsService } from '../services/observations.service';
import { MccObservation } from '../generated-data-api';
import { emptyCounseling } from '../datamodel/mockData';
import { Constants } from '../common/constants';

@Component({
  selector: 'app-lab-test-result',
  templateUrl: './lab-test-result.component.html',
  styleUrls: ['./lab-test-result.component.css']
})
export class LabTestResultComponent implements OnInit {
  latestEgfr: MccObservation;

  constructor(public dataservice: DataService, public ObservationsService: ObservationsService) { }

  ngOnInit(): void {
    console.log(`in LabTestResultComponent ngOnInit(): this.dataservices.egfr : `, this.dataservice.egfr);

    this.ObservationsService.getObservation(this.dataservice.currentPatientId, Constants.observationCodes.Egfr).then((egfr: MccObservation) => {
      this.latestEgfr = egfr;
    });
  }
}