import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service'
import { Router } from '@angular/router';
import User from '../../models/User';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  constructor(private us: UsersService, private router: Router) { }

  addUser() {
    this.us.create(this.user).subscribe(
      (complete) => {
        this.router.navigate(['users']);
      }
    )
  }

  onSubmit() {
    this.addUser();
  }

  ngOnInit() {
    this.user = new User();
  }

}
