import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegComponent } from './create.reg/create.reg.component';
import { RegListComponent } from './reg.list/reg.list.component';
import { UserDetailComponent } from './user.detail/user.detail.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
{path:'', redirectTo:'login', pathMatch:'full'},
{path: 'login', component:LoginComponent},
{path:'register',component:CreateRegComponent},
{path:'list',component:RegListComponent},
{path: 'detail/:id', component:UserDetailComponent},
{path: 'update/:id', component:CreateRegComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
