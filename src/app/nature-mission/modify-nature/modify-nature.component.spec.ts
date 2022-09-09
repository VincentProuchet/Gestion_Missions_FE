import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNatureComponent } from './modify-nature.component';

describe('ModifyNatureComponent', () => {
  let component: ModifyNatureComponent;
  let fixture: ComponentFixture<ModifyNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyNatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
