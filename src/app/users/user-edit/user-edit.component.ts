import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../../models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  onSubmit() {
    this.updateUser();
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe(
      ({ data }) => {
        this.router.navigate(['users']);
      },
      error => {
        console.log("there was an error sending the query", error);
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUser(params['id']).subscribe(data => {
                this.user = data.data['User'];
              });
    });
  }
}
