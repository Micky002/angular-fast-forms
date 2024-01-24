import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { DoubleColumnComponent } from './component/util/double-column/double-column.component';

@NgModule({
  declarations: [AppComponent, DoubleColumnComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    FastFormsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    DoubleColumnComponent,
  ],
})
export class AppModule {
}
