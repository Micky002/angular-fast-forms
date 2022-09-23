import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-double-column',
  templateUrl: './double-column.component.html',
  styleUrls: ['./double-column.component.scss'],
})
export class DoubleColumnComponent {
  @Input() leftTitle!: string;
  @Input() rightTitle!: string;
}
