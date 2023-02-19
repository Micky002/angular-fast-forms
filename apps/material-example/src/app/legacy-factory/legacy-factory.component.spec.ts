import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { LegacyFactoryComponent } from './legacy-factory.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LegacyFactoryComponent', () => {
  let component: LegacyFactoryComponent;
  let fixture: ComponentFixture<LegacyFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LegacyFactoryComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LegacyFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
