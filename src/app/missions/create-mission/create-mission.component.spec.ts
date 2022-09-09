import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMissionComponent } from './create-mission.component';

describe('CreateMissionComponent', () => {
  let component: CreateMissionComponent;
  let fixture: ComponentFixture<CreateMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
