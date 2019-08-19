import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from '../../models/User';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CreateUser } from '../graphql';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  user: User;
  constructor(private router: Router, private apollo: Apollo) { }

  addUser() {
    this.apollo
        .mutate({
          mutation: CreateUser,
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

  onSubmit() {
    this.addUser();
  }

  ngOnInit() {
    this.user = new User();
  }

}
