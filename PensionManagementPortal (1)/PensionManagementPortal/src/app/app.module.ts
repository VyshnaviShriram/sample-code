import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { SecurityComponent } from './security/security.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './error/error.component'
import { DatePipe } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { MenubarComponent } from './menubar/menubar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PensionportalComponent } from './pensionportal/pensionportal.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    SecurityComponent,
    DashboardComponent,
    ErrorComponent,
    LogoutComponent,
    MenubarComponent,
    HomepageComponent,
    PensionportalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
    
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
