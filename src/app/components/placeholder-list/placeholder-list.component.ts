import { Component } from '@angular/core';

@Component({
  selector: 'app-placeholder-list',
  templateUrl: './placeholder-list.component.html',
  styleUrls: ['./placeholder-list.component.scss']
})
export class PlaceholderListComponent {
  items = Array.from({ length: 20 }, (_, i) => i + 1);
}
