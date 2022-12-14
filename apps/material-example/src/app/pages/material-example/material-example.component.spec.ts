import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialExampleComponent } from './material-example.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MaterialExampleComponent', () => {
  let component: MaterialExampleComponent;
  let fixture: ComponentFixture<MaterialExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialFastFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        MaterialExampleComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
