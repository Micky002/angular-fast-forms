import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'frontend-form-array-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  template: `
    <div class="example-button-row">
      <a mat-raised-button routerLink="general" color="primary">General</a>
      <a mat-raised-button routerLink="nested" color="primary">Nested</a>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class FormArrayRootComponent {
}
