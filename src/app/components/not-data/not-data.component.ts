import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-data',
  templateUrl: './not-data.component.html',
  styleUrls: ['./not-data.component.scss']
})
export class NotDataComponent implements OnInit {
  @Input('loading') loading: boolean = false;
  @Input('text') text!: string;
  description = ''
  constructor() { }

  ngOnInit(): void {
    this.description = this.text ? this.text : 'No existen datos para mostrar';
  }

}
