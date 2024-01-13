import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  today = new Date();
  year!: number;
  constructor() { }

  ngOnInit(): void {
    this.year = this.today.getFullYear()
  }
}
