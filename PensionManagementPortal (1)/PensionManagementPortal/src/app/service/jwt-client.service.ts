import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PensionerInput, ProcessPensionInput } from '../dashboard/dashboard.component';


@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private http: HttpClient) { }

  JWT = localStorage.getItem('authenticaterUser')
  pensionerInput:PensionerInput
  processPensionInput:ProcessPensionInput

  public setPensionerInput(pensionerInput:any){
    this.pensionerInput=pensionerInput;
  }

  public setProcessPensionInput(processPensionInput:any){
    this.processPensionInput=processPensionInput;
  }

  public generateToken(request) {
    let resp = this.http.post("http://localhost:8100/auth/login", request);
    //let resp = this.http.post("http://ij50-pod4-lb-1480904113.us-east-2.elb.amazonaws.com/auth/login", request);
    return resp;
  }

  public getAllPensions() {
    let tokens: string = `Bearer ${this.JWT}`
    const headers = new HttpHeaders().set('Authorization', tokens)
    return this.http.get<any[]>("http://localhost:8200/pensionerDetail/allPensionerDetails", { headers });
    //return this.http.get<any[]>("http://ij50-pod4-lb-1480904113.us-east-2.elb.amazonaws.com/pensionerDetail/allPensionerDetails", { headers });
  }

  public callPensionDetail(pensionerInput:any) {
    let tokens: string = `Bearer ${this.JWT}`
    const headers = new HttpHeaders().set('Authorization', tokens)
    return this.http.post('http://localhost:8400/pensionProcess/pensionerInput',pensionerInput, { headers } );
    //return this.http.post('http://ij50-pod4-lb-1480904113.us-east-2.elb.amazonaws.com/pensionProcess/pensionerInput',pensionerInput, { headers } );
  }

  public callPensionDisburse(processPensionInput:any) {
    let tokens: string = `Bearer ${this.JWT}`
    const headers = new HttpHeaders().set('Authorization', tokens)
    return this.http.post('http://localhost:8400/pensionProcess/pensionDisbursement',processPensionInput, { headers } );
    //return this.http.post('http://ij50-pod4-lb-1480904113.us-east-2.elb.amazonaws.com/pensionProcess--/pensionDisbursement',processPensionInput, { headers } );
  }

}
