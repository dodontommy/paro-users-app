import {Component} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})
export class Modal {
  bodyText: string;
  headerText: string;
  activeModal: NgbActiveModal;

  constructor(activeModal: NgbActiveModal) {}
}

