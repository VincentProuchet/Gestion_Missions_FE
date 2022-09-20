import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMissionComponent } from './validation-mission.component';

describe('ValidationMissionComponent', () => {
  let component: ValidationMissionComponent;
  let fixture: ComponentFixture<ValidationMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
