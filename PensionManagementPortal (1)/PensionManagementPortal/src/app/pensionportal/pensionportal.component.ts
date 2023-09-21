import { Component, OnInit } from '@angular/core';
import { PensionerInput } from '../dashboard/dashboard.component';
import { JwtClientService } from '../service/jwt-client.service';

@Component({
  selector: 'app-pensionportal',
  templateUrl: './pensionportal.component.html',
  styleUrls: ['./pensionportal.component.css']
})
export class PensionportalComponent implements OnInit {

  constructor(private service: JwtClientService) {
    this.retrievePensioners();
   }
  pensionerList: any[];
  pensionerInput:PensionerInput;
  pensionDetail:any;

  public passtoCalculate(aadhaarNo) {
    let pensioner = this.pensionerList.find(i => i.aadhaarNumber == aadhaarNo);
    this.pensionerInput={
      'aadhaarNumber':pensioner.aadhaarNumber,
      'name':pensioner.name,
      'dateOfBirth':pensioner.dateOfBirth,
      'panNumber':pensioner.panNumber,
      'pensionType':pensioner.pensionType
    }
    this.service.setPensionerInput(this.pensionerInput);
  }

  public retrievePensioners() {
    this.service.getAllPensions().subscribe(data => this.pensionerList = data);
  }


  ngOnInit(): void {
    
  }

}
