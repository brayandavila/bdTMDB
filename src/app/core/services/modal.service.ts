import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public modalRef: any;
  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = true;
    config.keyboard = true;
  }

  open(content: any, size = 'md', scroll = true) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size, scrollable: scroll });
  }
  close() {
    this.modalService.dismissAll();
  }
}
