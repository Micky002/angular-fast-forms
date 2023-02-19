import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { MaterialExampleComponent } from './material-example.component';
import { MaterialFastFormsModule } from '@ngx-fast-forms/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { FastFormsModule } from '@ngx-fast-forms/core';
import { MaterialExperimentalFastFormsModule } from '@ngx-fast-forms/material-experimental';

describe('MaterialExampleComponent', () => {
  let component: MaterialExampleComponent;
  let fixture: ComponentFixture<MaterialExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        NoopAnimationsModule,
        FastFormsModule,
        MaterialFastFormsModule,
        MaterialExperimentalFastFormsModule
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
