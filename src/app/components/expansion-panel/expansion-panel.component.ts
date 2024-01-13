import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.css'
})
export class ExpansionPanelComponent {
  @Input() expanded = false;
  @Input() title = '';
}
