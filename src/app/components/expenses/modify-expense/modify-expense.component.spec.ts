import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyExpenseComponent } from './modify-expense.component';

describe('ModifyExpenseComponent', () => {
  let component: ModifyExpenseComponent;
  let fixture: ComponentFixture<ModifyExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
