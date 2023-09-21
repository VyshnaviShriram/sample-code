import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtClientService } from '../service/jwt-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pensionDetail:any
  pensionerInput:any
  processPensionInput:any
  processPensionResponse:any
  aadhaarNumber:Number
  bankServiceCharge:Number
  pensionAmount:Number

  exForm: FormGroup

  constructor(private service:JwtClientService,private router: Router){
    this.service.callPensionDetail(this.service.pensionerInput).subscribe(data=>{
      this.pensionDetail=data;
      this.pensionAmount=this.pensionDetail.pensionAmount;
    },
    error=>{
      console.log(error);
    });
    this.pensionerInput=this.service.pensionerInput;
    this.aadhaarNumber=this.service.pensionerInput.aadhaarNumber;
   }
  runDisburse(){
    this.processPensionInput={
      'aadhaarNumber':this.aadhaarNumber,
      'pensionAmount':this.pensionAmount,
      'bankServiceCharge':this.bankServiceCharge
    }
    console.log(this.processPensionInput);
    this.service.setProcessPensionInput(this.processPensionInput);
    this.service.callPensionDisburse(this.service.processPensionInput).subscribe(data=>{
      this.processPensionResponse=data;
    },
    error=>{
      console.log(error);
    });
  }

  validateForm() {
    if (this.exForm.invalid) {
      this.exForm.get('name').markAsTouched();
      this.exForm.get('dateOfBirth').markAsTouched();
      this.exForm.get('panNumber').markAsTouched();
      this.exForm.get('pensionAmount').markAsTouched();
      this.exForm.get('aadhaarNumber').markAsTouched();
      this.exForm.get('bankServiceCharge').markAsTouched();
      return;
    }
  }

  ngOnInit(): void {
    this.exForm = new FormGroup({
      "name": new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$'), Validators.minLength(5)]),
      "dateOfBirth": new FormControl('', [Validators.required]),
      "panNumber": new FormControl('', [Validators.required,Validators.pattern('^[A-Z0-9]+$')]),
      "pensionAmount": new FormControl('', [Validators.required,Validators.min(1)]),
      "aadhaarNumber":new FormControl('',[Validators.required,Validators.minLength(12),Validators.maxLength(12)]),
      "bankServiceCharge":new FormControl('',[Validators.required,Validators.min(1)])
    })
}

}

export class PensionerInput {
  constructor(
    public aadhaarNumber: Number,
    public name: string,
    public dateOfBirth: Date,
    public panNumber: string,
    public pensionType: string) {
  }
}

export class ProcessPensionInput {
  constructor(
    public aadhaarNumber: Number,
    public pensionAmount: Number,
    public bankServiceCharge:Number) {
  }
}