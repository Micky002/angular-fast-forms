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
import { FastFormsModule } from '@ngx-fast-forms/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { MatIconModule } from '@angular/material/icon';

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
    FastFormsModule.forRoot(),
    NgxsModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
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
      },
      {
        path: 'nested-control',
        loadChildren: () =>
            import('./pages/custom-nested-control/custom-nested-control.module')
                .then((m) => m.CustomNestedControlModule)
      },
      {
        path: 'ngxs',
        loadChildren: () =>
            import('./pages/ngxs/example-ngxs.module')
                .then((m) => m.ExampleNgxsModule)
      },
      {
        path: 'custom-array',
        loadChildren: () =>
            import('./pages/custom-array/custom-array.module')
                .then((m) => m.CustomArrayModule)
      },
      {
        path: 'single-control',
        loadChildren: () =>
            import('./pages/single-control/single-control.module')
                .then((m) => m.SingleControlModule)
      }
    ]),
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
