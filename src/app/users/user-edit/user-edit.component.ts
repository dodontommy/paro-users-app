import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../../models/User';
import gql from 'graphql-tag';
import { UpdateUser, GetUser } from '../graphql';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  user: User;

  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo) {}

  onSubmit() {
    this.updateUser();
  }

  updateUser() {
    this.apollo
        .mutate({
          mutation: UpdateUser,
          variables: this.user
        })
        .subscribe(
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
      this.apollo
        .watchQuery<Response>({
          query: GetUser,
          variables: {
            id: params['id']
          },
          fetchPolicy: "network-only"
        })
        .valueChanges.subscribe(data => {
          this.user = data.data['User'];
        });
    });
  }
}
