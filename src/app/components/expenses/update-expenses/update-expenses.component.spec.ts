import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExpensesComponent } from './update-expenses.component';

describe('UpdateExpensesComponent', () => {
  let component: UpdateExpensesComponent;
  let fixture: ComponentFixture<UpdateExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
