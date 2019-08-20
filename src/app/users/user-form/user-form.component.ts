import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user: object;
  @Output() onSubmit = new EventEmitter();

  userForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      UserName: ['', Validators.required ],
      UserEmail: ['', Validators.required ],
      UserIsAdmin: ['', Validators.required ],
      UserType: [''],
      UserStreet: [''],
      UserState: [''],
      UserCity: [''],
      UserZip: ['']
    });
  }

  userTypeChanged() {
    if (this.user['type'] != 'internal') {
      this.user['is_admin'] = false;
    }
  }

  handleSubmit() {
    this.onSubmit.next();
  }

  ngOnInit() {
  }

}
