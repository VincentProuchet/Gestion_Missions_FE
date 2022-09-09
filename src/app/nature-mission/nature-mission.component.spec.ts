import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureMissionComponent } from './nature-mission.component';

describe('NatureMissionComponent', () => {
  let component: NatureMissionComponent;
  let fixture: ComponentFixture<NatureMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatureMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NatureMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
