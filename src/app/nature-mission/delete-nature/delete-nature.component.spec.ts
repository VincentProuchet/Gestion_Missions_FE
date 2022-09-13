import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNatureComponent } from './delete-nature.component';

describe('DeleteNatureComponent', () => {
  let component: DeleteNatureComponent;
  let fixture: ComponentFixture<DeleteNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
