import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMissionsComponentComponent } from './all-missions-component.component';

describe('AllMissionsComponentComponent', () => {
  let component: AllMissionsComponentComponent;
  let fixture: ComponentFixture<AllMissionsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMissionsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMissionsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
