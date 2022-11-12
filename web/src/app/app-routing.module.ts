import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserSigninComponent } from './components/user-signin/user-signin.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'signin', component: UserSigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }