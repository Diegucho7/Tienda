import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RestorePasswordComponent} from './restore-password/restore-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';




const routes: Routes = [
    { path: 'auth', component:LoginComponent ,

      },
      {
        path: 'register', component:RegisterComponent
      }, {
        path: 'restore-Password', component:RestorePasswordComponent
      },
      {
        path: 'change-password/:token', component:ChangePasswordComponent
      }



];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
