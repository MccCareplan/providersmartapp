import {Injectable} from '@angular/core';
import {Demographic} from './datamodel/demographics';
import {SubjectDataService} from './subject-data-service.service';
import {CareplanService} from './careplan.service';
// import {ConditionLists} from './datamodel/conditionLists';
import {MccCarePlan} from '../../generated/models/MccCarePlan';
import {SocialConcerns} from './datamodel/socialconcerns';
// import {ConditionLists} from './datamodel/conditionLists';
import {ConditionLists} from '../../generated';
import {TargetValue} from './datamodel/targetvalue';
import {
  dummyPatientId,
  dummyCareplanId,
  dummySubject,
  dummyConditions,
  dummyCarePlan,
  dummySocialConcerns,
  mockContacts,
  mockEducation,
  mockNutrition,
  mockReferrals,
  mockTargetData,
  mockGoalList,
  mockMedicationSummary
} from './datamodel/mockData';
import {GoalLists} from '../../generated';
import {MedicationSummary} from './datamodel/medicationSummary';
import {Education} from './datamodel/education';
import {Referral} from './datamodel/referral';
import {Contact} from './datamodel/contact';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  currentPatientId: string;
  currentCareplanId: string;
  demographic: Demographic;
  careplan: MccCarePlan;
  socialConcerns: SocialConcerns[];
  conditions: ConditionLists;
  targetValues: TargetValue[];
  goals: GoalLists;
  medications: MedicationSummary[];
  education: Education[];
  nutrition: Education[];
  referrals: Referral[];
  contacts: Contact[];

  constructor(private subjectdataservice: SubjectDataService, private careplanservice: CareplanService) {
  }

  async setCurrentSubject(patientId: string): Promise<boolean> {
    this.currentPatientId = patientId;
    if ((!patientId || patientId.trim().length === 0)) {
      this.currentPatientId = dummyPatientId;
      this.currentCareplanId = dummyCareplanId;
      this.demographic = dummySubject;
      this.conditions = dummyConditions;
    } else {
      /*
      this.subjectdataservice.getSubject(this.currentPatientId)
        .subscribe(demograhic => this.demographic = demograhic);
      this.subjectdataservice.getConditions(this.currentPatientId)
        .subscribe(condition => this.conditions = condition);
       */
      this.updateDemographics();
      this.updateConditions();
    }
    this.medications = mockMedicationSummary;
    this.education = mockEducation;
    this.nutrition = mockNutrition;
    this.referrals = mockReferrals;
    this.contacts = mockContacts;

    return true;

  }

  async setCurrentCarePlan(planId: string): Promise<boolean> {
    this.currentCareplanId = planId;
    if ((!planId || planId.trim().length === 0)) {
      this.socialConcerns = dummySocialConcerns;
      this.careplan = dummyCarePlan;
    } else {
      this.updateCarePlan();
      this.updateSocialConcerns();
    }
    /*
    this.careplanservice.getCarePlan(this.currentCareplaId)
      .subscribe(careplan => this.careplan = careplan);
    this.subjectdataservice.getSocialConcerns(this.currentPatientId, this.currentCareplaId)
      .subscribe(concerns => this.socialConcerns = concerns);
    */
    this.targetValues = mockTargetData;
    this.goals = mockGoalList;
    return true;
  }

  async updateCarePlan(): Promise<boolean> {
    this.careplanservice.getCarePlan(this.currentCareplanId)
      .subscribe(careplan => this.careplan = careplan);
    return true;
  }

  async updateSocialConcerns(): Promise<boolean> {
    this.subjectdataservice.getSocialConcerns(this.currentPatientId, this.currentCareplanId)
      .subscribe(concerns => this.socialConcerns = concerns);
    return true;
  }

  async updateDemographics(): Promise<boolean> {
    this.subjectdataservice.getSubject(this.currentPatientId)
      .subscribe(demograhic => this.demographic = demograhic);
    // this.subjectdataservice.getConditions(this.currentPatientId)
    //   .subscribe(condition => this.conditions = condition);
    return true;
  }

  async updateConditions(): Promise<boolean> {
    this.subjectdataservice.getConditions(this.currentPatientId)
      .subscribe(condition => this.conditions = condition);
    return true;
  }
}
