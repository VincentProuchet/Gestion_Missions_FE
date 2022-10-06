import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMissionComponent } from './remove-mission.component';

describe('RemoveMissionComponent', () => {
  let component: RemoveMissionComponent;
  let fixture: ComponentFixture<RemoveMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
