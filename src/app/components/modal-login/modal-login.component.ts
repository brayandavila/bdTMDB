import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {
  @ViewChild('loginModal') loginModal: any;

  constructor(
    private _modal: ModalService
  ) { }

  ngOnInit(): void {
  }

  openModal() {
    this._modal.open(this.loginModal)
  }

  login() {

  }
}
