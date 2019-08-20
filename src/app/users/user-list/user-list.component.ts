import { Component, OnInit } from '@angular/core';
import User from '../../models/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from '../../modal/modal.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private ms: NgbModal, private router: Router, private userService: UserService) {}

  openDeleteModal(user) {
    const modalRef = this.ms.open(Modal);
    modalRef.componentInstance.headerText = "Are you sure?";
    modalRef.componentInstance.bodyText = `This will permanently delete ${user.name}. You can never get them back.`;
    modalRef.result.then((result) => {
      if (result == 'confirm') {
        this.deleteUser(user);
      }
    })
  }

  showUserDetails(user) {
    this.router.navigate(['users', 'view', user.id]);
  }

  removeFromUsers(id) {
    let user = this.users.find(user => user.id == id);
    this.users.splice(this.users.indexOf(user), 1);
  }

  deleteUser(user) {
    this.userService.deleteUser(user.id).subscribe(
      ({ data }) => {
        this.removeFromUsers(data.deleteUser.id);
      },
      error => {
        console.log("there was an error sending the query", error);
      }
    );
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
        this.users =  data.data['Users'];
      });;
  }

}
