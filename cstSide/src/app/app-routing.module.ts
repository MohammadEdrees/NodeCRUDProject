import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Forms/dashboard/dashboard.component';
import{RegisterationComponent} from './Forms/registeration/registeration.component';
import{LoginComponent}from './Forms/login/login.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ProfilComponent } from './profil/profil.component';
import { MypostsComponent } from './myposts/myposts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostEditComponent } from './post-edit/post-edit.component';
const routes: Routes = [
  {path:'home',component:DashboardComponent},
  {path:'register',component:RegisterationComponent},
  {path:'login',component:LoginComponent},
  {path:'createblog',component:CreateBlogComponent},
  {path:'profile',component:ProfilComponent},
  {path:'profile/:id',component:ProfilComponent},
  {path:'myposts',component:MypostsComponent},
  {path:"post/details/:id",component:PostDetailsComponent},
  {path:"user/posts/post/:id",component:MypostsComponent},
  {path:"posts/edit/:id",component:PostEditComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'},


  //{path:'**',component:notFound}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
