import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMissionsComponent } from './all-missions.component';

describe('AllMissionsComponent', () => {
  let component: AllMissionsComponent;
  let fixture: ComponentFixture<AllMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
