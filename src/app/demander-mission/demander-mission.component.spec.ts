import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemanderMissionComponent } from './demander-mission.component';

describe('DemanderMissionComponent', () => {
  let component: DemanderMissionComponent;
  let fixture: ComponentFixture<DemanderMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemanderMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemanderMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
