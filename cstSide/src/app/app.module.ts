import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Forms/login/login.component';
import { RegisterationComponent } from './Forms/registeration/registeration.component';
import { DashboardComponent } from './Forms/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterationComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,HttpClientModule,NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent,HeaderComponent]
})
export class AppModule { }
