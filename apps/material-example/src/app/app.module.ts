import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialExampleComponent } from './pages/material-example/material-example.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, MaterialExampleComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialFastFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: MaterialExampleComponent
      },
      {
        path: 'lazy-loading-example',
        loadChildren: () =>
          import('./lazy-loading-example/lazy-loading-example.module').then(
            (m) => m.LazyLoadingExampleModule
          ),
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
