import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialExampleComponent } from './pages/material-example/material-example.component';
import { HttpClientModule } from '@angular/common/http';
import { FormArrayComponent } from './pages/form-array/form-array.component';
import { GithubReadmeExampleComponent } from './pages/github-readme-example/github-readme-example.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    MaterialExampleComponent,
    FormArrayComponent,
    GithubReadmeExampleComponent
  ],
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
        path: 'form-array',
        component: FormArrayComponent
      },
      {
        path: 'github-example',
        component: GithubReadmeExampleComponent
      },
      {
        path: 'lazy-loading-example',
        loadChildren: () =>
          import('./lazy-loading-example/lazy-loading-example.module')
            .then((m) => m.LazyLoadingExampleModule)
      },
      {
        path: 'validation',
        loadChildren: () =>
          import('./pages/validation/validation.module')
            .then((m) => m.ValidationModule)
      }
    ]),
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
