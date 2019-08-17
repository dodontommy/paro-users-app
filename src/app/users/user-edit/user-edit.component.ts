import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import User from '../../models/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  user: User;

  constructor(private route: ActivatedRoute, private router: Router, private us: UsersService) {}

  onSubmit() {
    this.updateUser();
  }

  updateUser() {
    this.us.update(this.user).subscribe(
      (complete) => {
        this.router.navigate(['users']);
      }
    )
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.us.read(params['id']).subscribe(res => {
          this.user = res;
      });
    });
  }
}
