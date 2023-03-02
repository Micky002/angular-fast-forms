import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'matex-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  // constructor() {}

  // ngOnInit(): void {}
}
