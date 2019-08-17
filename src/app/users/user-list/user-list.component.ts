import { Component, OnInit } from '@angular/core';
import User from '../../models/User';
import { UsersService } from '../users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from '../../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];
  constructor(private us: UsersService, private ms: NgbModal, private router: Router) {}

  openDeleteModal(user) {
    const modalRef = this.ms.open(Modal);
    modalRef.componentInstance.headerText = "Are you sure?";
    modalRef.componentInstance.bodyText = `This will permanently delete ${user.UserName}. You can never get them back.`;
    modalRef.result.then((result) => {
      if (result == 'confirm') {
        this.deleteUser(user);
      }
    })
  }

  showUserDetails(user) {
    this.router.navigate(['users', user.id]);
  }

  deleteUser(user) {
    this.us.delete(user.id).subscribe(
      (complete) => {
        this.users.splice(this.users.indexOf(user), 1);
      }
    )
  }

  ngOnInit() {
    this.us.list().subscribe((data: User[]) => {
      this.users = data;
    });
  }

}
