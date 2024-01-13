import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-or-not-data',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './loading-or-not-data.component.html',
  styleUrl: './loading-or-not-data.component.css'
})
export class LoadingOrNotDataComponent {
  @Input() loading: boolean = false;
  @Input() text: string = 'No existen datos para mostrar';
}
