import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMissionsComponent } from './gestion-missions.component';

describe('GestionMissionsComponent', () => {
  let component: GestionMissionsComponent;
  let fixture: ComponentFixture<GestionMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionMissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
