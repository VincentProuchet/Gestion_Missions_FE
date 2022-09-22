import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMaskComponent } from './auth-mask.component';

describe('AuthMaskComponent', () => {
  let component: AuthMaskComponent;
  let fixture: ComponentFixture<AuthMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthMaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
