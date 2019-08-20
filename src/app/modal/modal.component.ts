import {Component} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})
export class Modal {
  bodyText: string;
  headerText: string;

  constructor(private activeModal: NgbActiveModal) {}

  handleClick(reason) {
    this.activeModal.close(reason);
  }
}

