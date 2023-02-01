import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule
  ],
  template: `
    <div class="sub-menu">
      <a mat-raised-button routerLink="nested-control" color="primary">Nested</a>
    </div>
    <router-outlet></router-outlet>
  `
})
export class ControlComponent {
}
