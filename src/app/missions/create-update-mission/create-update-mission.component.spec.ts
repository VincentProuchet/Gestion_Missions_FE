import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateMissionComponent } from './create-update-mission.component';

describe('CreateUpdateMissionComponent', () => {
  let component: CreateUpdateMissionComponent;
  let fixture: ComponentFixture<CreateUpdateMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
