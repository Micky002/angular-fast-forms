import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubReadmeExampleComponent } from './github-readme-example.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('GithubReadmeExampleComponent', () => {
  let component: GithubReadmeExampleComponent;
  let fixture: ComponentFixture<GithubReadmeExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialFastFormsModule
      ],
      declarations: [
        GithubReadmeExampleComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GithubReadmeExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
