import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
  ],
  template: `
    <div class="example-header">
      <a color="primary" mat-raised-button routerLink="/home">Home</a>
      <a color="primary" mat-raised-button routerLink="/github-example">Github Example</a>
      <a color="primary" mat-raised-button routerLink="/form-array">Form array</a>
      <a color="primary" mat-raised-button routerLink="/custom-array">Custom array</a>
      <a color="primary" mat-raised-button routerLink="/lazy-loading-example">Lazy Loading Example</a>
      <a color="primary" mat-raised-button routerLink="/validation">Validation</a>
      <a color="primary" mat-raised-button routerLink="/nested-control">Nested Control</a>
      <a color="primary" mat-raised-button routerLink="/single-control">Single Control</a>
      <a color="primary" mat-raised-button routerLink="/ngxs">Ngxs</a>
    </div>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./legacy-factory.component.scss'],
})
export class LegacyFactoryComponent {
}
