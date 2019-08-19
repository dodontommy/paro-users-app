import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../../models/User';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GetUser } from '../graphql';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo) { }

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
