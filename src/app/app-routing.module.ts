import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [ 
    {
        path:'',
        component:LoginComponent,
        outlet:'user'
    },
    {
        path:'login',
        component:LoginComponent,
        outlet: 'user'
    },{
        path:'register',
        component:RegisterComponent,
        outlet:'user'
    },{
        path:'user',
        component:UserComponent,
        outlet:'user'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
