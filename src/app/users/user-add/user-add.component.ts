import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../../models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  user: User;
  constructor(private router: Router, private userService: UserService) { }

  addUser() {
    this.userService.createUser(this.user).subscribe(
      ({ data }) => {
        this.router.navigate(['users']);
      },
      error => {
        console.log("there was an error sending the query", error);
      }
    );
  }

  onSubmit() {
    this.addUser();
  }

  ngOnInit() {
    this.user = new User();
  }

}
