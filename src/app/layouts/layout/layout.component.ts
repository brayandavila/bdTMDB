import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {
  viewportHeight: number;

  constructor(private viewportScroller: ViewportScroller) {
    this.viewportHeight = window.innerHeight;
  }

  ngAfterViewInit() {
    this.verificarViewportHeight();
  }

  @HostListener('window:resize')
  verificarViewportHeight() {
    const scrollPosition = this.viewportScroller.getScrollPosition();
    const viewportHeight = window.innerHeight - scrollPosition[1];
    this.viewportHeight = viewportHeight;
  }

}
