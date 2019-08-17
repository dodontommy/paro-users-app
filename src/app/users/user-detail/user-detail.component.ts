import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import User from '../../models/User';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  constructor(private route: ActivatedRoute, private router: Router, private us: UsersService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.us.read(params['id']).subscribe(res => {
          this.user = res;
      });
    });
  }

}
