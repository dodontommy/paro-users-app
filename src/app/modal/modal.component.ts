import {Component} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})
export class Modal {
  closeResult: string;

  constructor(private activeModal: NgbActiveModal) {}
}

