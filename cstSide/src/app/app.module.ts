import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import{ FormsModule ,ReactiveFormsModule }from'@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Forms/login/login.component';
import { RegisterationComponent } from './Forms/registeration/registeration.component';
import { DashboardComponent } from './Forms/dashboard/dashboard.component';
import { RegisterService } from './serve/register.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthInterceptor } from './_servives/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterationComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    CreateBlogComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RegisterService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
