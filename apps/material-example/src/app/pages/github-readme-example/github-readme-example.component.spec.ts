import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubReadmeExampleComponent } from './github-readme-example.component';

describe('GithubReadmeExampleComponent', () => {
  let component: GithubReadmeExampleComponent;
  let fixture: ComponentFixture<GithubReadmeExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GithubReadmeExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GithubReadmeExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
