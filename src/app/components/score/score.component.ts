import { DecimalPipe, NgStyle } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CircleProgressOptions, NgCircleProgressModule } from 'ng-circle-progress';
import { KnobModule } from 'primeng/knob';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [NgStyle, MatProgressSpinnerModule, DecimalPipe, KnobModule, FormsModule, NgCircleProgressModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [CircleProgressOptions],
})
export class ScoreComponent implements OnChanges {

  @Input() score!: number;

  @Input() size: number = 75;

  @Input() strokeWidth: number = 14;

  value!: number;

  valueColor!: string;

  rangeColor!: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['score']) {
      this.generateColors();
      this.rounded();
    }
  }

  generateColors(): void {
    if (this.score >= 7) {
      this.valueColor = 'LightGreen';
      this.rangeColor = '#1D4028';
    } else if (this.score <= 4) {
      this.valueColor = '#eb1114';
      this.rangeColor = '#5B1B1B';
    } else if (this.score < 7 && this.score > 4) {
      this.valueColor = '#D2D531';
      this.rangeColor = '#3E3A10';
    }
  }

  rounded() {
    this.score = Math.round(this.score * 10)
  }
}
