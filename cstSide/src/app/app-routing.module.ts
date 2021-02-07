import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Forms/dashboard/dashboard.component';
import{RegisterationComponent} from './Forms/registeration/registeration.component';
import{LoginComponent}from './Forms/login/login.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ProfilComponent } from './profil/profil.component';
const routes: Routes = [
  {path:'home',component:DashboardComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'register',component:RegisterationComponent},
  {path:'login',component:LoginComponent},
  {path:'createblog',component:CreateBlogComponent},
  {path:'profil',component:ProfilComponent}


  //{path:'**',component:notFound}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
