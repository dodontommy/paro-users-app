import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';


const routes: Routes = [
{
  path: 'users',
  component: UserListComponent,
  data: { title: 'List of users'}
},
{
  path: 'users/view/:id',
  component: UserDetailComponent,
  data: { title: 'User Details'}
},
{
  path: 'users/add',
  component: UserAddComponent,
  data: { title: 'Add User' }
},
{
  path: 'users/edit/:id',
  component: UserEditComponent,
  data: { title: 'Edit User' }
},
{
  path: '',
  redirectTo: '/users',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
