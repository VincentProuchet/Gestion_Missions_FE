import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreationNatureComponent } from 'src/app/nature-mission/creation-nature/creation-nature.component';




describe('CreationNatureComponent', () => {
  let component: CreationNatureComponent;
  let fixture: ComponentFixture<CreationNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreationNatureComponent]

    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(CreationNatureComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
