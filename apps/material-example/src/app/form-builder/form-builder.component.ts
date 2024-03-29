import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'matex-form-builder',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
  ],
  template: `
    <div class="menu-container">
      <div class="side-container">
        <mat-nav-list>
          <a mat-list-item routerLink="group">Form Group</a>
        </mat-nav-list>
      </div>
      <div class="content-container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent {
}
