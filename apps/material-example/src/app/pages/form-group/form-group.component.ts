import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'frontend-form-group',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  template: `
    <div class="example-button-row">
      <a mat-raised-button routerLink="nested-group" color="primary">Nested</a>
    </div>
  `,
  styles: [],
})
export class FormGroupComponent {
}
