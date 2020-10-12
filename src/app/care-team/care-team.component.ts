import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-care-team',
  templateUrl: './care-team.component.html',
  styleUrls: ['./care-team.component.css']
})
export class CareTeamComponent implements OnInit {


  constructor(public dataservice: DataService) {
  }
  gridColumns = 4;

  iconNames = {
    types:
      [
        {type: 'person', icon: 'person'},
        {type: 'organization', icon: 'group'}
      ],
    roles:
      [
        {role: 'patient', icon: 'sick'},
        {role: 'catering', icon: 'food_bank'},
        {role: 'physician', icon: 'medical_services'},
        {role: 'nurse', icon: 'medical_services'},
        {role: 'caregiver', icon: 'medical_services'},
        {role: 'ologist', icon: 'medical_services'},
        {role: 'dietician', icon: 'fastfood'},
        {role: 'social worker', icon: 'psychology'},
        {role: 'pharmacist', icon: 'medical_services'},
      ]
  };

  ngOnInit(): void {

  }

  getTypeIcon(type) {
     const icon = this.iconNames.types.filter( t => type.toLowerCase().includes(t.type.toLowerCase()));
     if (icon.length >  0) {
       return icon[0].icon;
     } else {
       return '';
     }
    }

  getRoleIcon(role) {
    const icon = this.iconNames.roles.filter( r => role.toLowerCase().includes(r.role.toLowerCase()));
    if (icon.length > 0) {
      return icon[0].icon;
    } else {
      return '';
    }
  }

}
