import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyFactoryComponent } from './legacy-factory.component';

describe('LegacyFactoryComponent', () => {
  let component: LegacyFactoryComponent;
  let fixture: ComponentFixture<LegacyFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegacyFactoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LegacyFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
