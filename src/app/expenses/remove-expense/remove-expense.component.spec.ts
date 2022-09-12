import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveExpenseComponent } from './remove-expense.component';

describe('RemoveExpenseComponent', () => {
  let component: RemoveExpenseComponent;
  let fixture: ComponentFixture<RemoveExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
