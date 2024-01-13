import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-converter',
  standalone: true,
  imports: [],
  templateUrl: './time-converter.component.html',
  styleUrl: './time-converter.component.scss'
})
export class TimeConverterComponent implements OnInit {

  @Input() minutes: number = 0;

  @HostBinding('class') classes = 'h2'

  convertedTime: { hours: number, minutes: number } = { hours: 0, minutes: 0 };

  ngOnInit(): void {
    this.convertedTime = this.convertToHoursAndMinutes(this.minutes);
  }

  convertToHoursAndMinutes(minutes: number): { hours: number, minutes: number } {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return { hours, minutes: remainingMinutes };
  }

  getFormattedTime(): string {
    return `${this.convertedTime.hours}h ${this.convertedTime.minutes}m`;
  }
}
