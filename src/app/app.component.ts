import {
  AfterContentInit,
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SubjectDataService} from './services/subject-data-service.service';
import {CareplanService} from './services/careplan.service';
import {DataService} from './services/data.service';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {startWith, debounceTime, distinctUntilChanged, switchMap, map} from 'rxjs/operators';
import { MccCarePlan } from './generated-data-api/models/MccCarePlan';
import {ActivatedRoute, Router} from '@angular/router';
import { ObservationsService } from './services/observations.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit, AfterViewInit {

  // todo:  use of patSearch template variable to set focus not working..
  @ViewChild('patSearch', {static: true}) patSearch: any;
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(public dataservice: DataService, public subjectdataservice: SubjectDataService,
              private route: ActivatedRoute, private changeDetector: ChangeDetectorRef,
              private router: Router,
              private observationsService: ObservationsService) {

    this.navLinks = [
      {
        label: 'Health and Social Concerns',
        link: './health',
        index: 0
      }, {
        label: 'Goals and Preferences',
        link: './goals',
        index: 1
      }, {
        label: 'Health Maintenance & Interventions',
        link: './maint',
        index: 2
      }, {
        label: 'Health Status Evaluation & Outcomes',
        link: './status',
        index: 2
      }, {
        label: 'Care Team',
        link: './care',
        index: 2
      },
    ];
  }


  basefhirserver = 'https://api.logicahealth.org/MCCeCarePlanTest/open/';
  title = 'providersmartapp';
  events: string[] = [];
  opened: boolean;
  apiURL: string;
  // currentSubjectId = 'cc-pat-betsy';
  // currentCarePlanId = 'cc-careplan-betsy-ckd';
  currentSubjectId = '';
  currentCarePlanId = '';
  patientSearch = new FormControl('', Validators.required);

  filteredPatients: Observable<any[]>;
  selectedPatientId = '';
  showPatientSearch = false;
  smartLaunch = false;
  refreshedForced = false;
  minSearchCharacters = 3;
  devmode = false;
  patientCarePlans: Observable<MccCarePlan[]>;

  ngOnInit(): void {
    this.dataservice.mainfhirserver = this.basefhirserver;
    this.apiURL = environment.mccapiUrl;
    this.initFilteredPatients();
    this.dataservice.setCurrentSubject(this.currentSubjectId);
    this.dataservice.setCurrentCarePlan(this.currentCarePlanId);
    this.route.queryParams.subscribe(params => {
        console.log(params); // { order: "popular" }

        const dev = params.devmode;
        this.devmode = (dev === 'true');
        console.log('Development Mode: ' + this.devmode);
        if (params.subject != null) {
          this.currentSubjectId = params.subject;
          this.dataservice.setCurrentSubject(this.currentSubjectId);
        }
      }
    );

    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

    const skey = sessionStorage.SMART_KEY;
    const key = skey.replace(/['"]+/g, '');
    console.log('Ang: Smart Key is ' + key);
    if (key != null) {
      this.updateDataContext(key, 4);
    }
  }

  waitFor(time: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('I promise to return after ' + time + 'milliseconds!');
      }, time);
    });
  }

  async updateDataContext(key: string, count: number): Promise<void> {
    console.log('Updating Context');
    const info = JSON.parse(sessionStorage.getItem(key));
    if (info != null) {
      console.log('server: ' + info.serverUrl);
      const tokenResp = info.tokenResponse;
      if (tokenResp.access_token != null) {
        console.log('access_token: ' + tokenResp.access_token);
        console.log('patient: ' + tokenResp.patient);
        this.dataservice.updateFHIRConnection(info.serverUrl, tokenResp.access_token);
        this.patientSelected(tokenResp.patient);
        this.smartLaunch = true;
        this.changeDetector.detectChanges();
      } else {
        // Smart on FHIR still not ready (grrr....)
        if (count > 0) {
          const t = await this.waitFor(1000);
          console.log(t);
          this.updateDataContext(key, count - 1);
        }
      }
    } else {
      console.log('No info for key ' + key + ' found');
    }
  }

  ngAfterViewInit(): void {
    //
  }

  private _dataFilter(val: string): Observable<any> {
    // call the http data to find matching patients
    if (val.length >= this.minSearchCharacters) {
      return this.subjectdataservice.getSubjects(val)
        .pipe(
          map(response => response)
        );
    }
  }

  patientSelected(data) {
    this.currentSubjectId = data;
    this.patientCarePlans = new Observable<MccCarePlan[]>();     // Initialize patient care plans to empty object.
    this.dataservice.setCurrentSubject(this.currentSubjectId);   // Care Plan selection for patient done in dataservice.setCurrentSubject

    this.patientSearch.setValue('');
    this.showPatientSearch = false;
    this.initFilteredPatients();
    // this.goalscmp.refreshTargets();
  }

  togglePatientSearch() {
    this.showPatientSearch = !this.showPatientSearch;
    if (this.showPatientSearch) {
      this.patientSearch.setValue('');
      this.patSearch.nativeElement.focus();
    }
  }

  initFilteredPatients() {
    this.filteredPatients = new Observable<any[]>();
    this.filteredPatients = this.patientSearch.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => this._dataFilter(value || ''))
      );
  }
}
