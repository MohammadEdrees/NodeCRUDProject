import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Forms/dashboard/dashboard.component';
import{RegisterationComponent} from './Forms/registeration/registeration.component';
import{LoginComponent}from './Forms/login/login.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ProfilComponent } from './profil/profil.component';
import { MypostsComponent } from './myposts/myposts.component';
const routes: Routes = [
  {path:'home',component:DashboardComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'register',component:RegisterationComponent},
  {path:'login',component:LoginComponent},
  {path:'createblog',component:CreateBlogComponent},
  {path:'profile',component:ProfilComponent},
  {path:'profile/:id',component:ProfilComponent},
  {path:'myposts',component:MypostsComponent}


  //{path:'**',component:notFound}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
