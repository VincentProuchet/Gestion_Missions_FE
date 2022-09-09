import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNatureComponent } from './add-nature.component';

describe('AddNatureComponent', () => {
  let component: AddNatureComponent;
  let fixture: ComponentFixture<AddNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
