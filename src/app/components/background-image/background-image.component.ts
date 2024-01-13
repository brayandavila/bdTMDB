import { Component, Input } from '@angular/core';
import { getImage } from '../../core/utils/get-image';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-background-image',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './background-image.component.html',
  styleUrl: './background-image.component.scss'
})
export class BackgroundImageComponent {

  @Input() image!: string;
  getBackgroundImageStyle(path: string): string {
    return `linear-gradient(rgba(52,41,49,0.80), rgba(0,0,0,0.85)), url(${this.getImage(path, 'w1280')}`;
  }

  getImage(path: string, size: string): string {
    return getImage(path, size)
  }
}
