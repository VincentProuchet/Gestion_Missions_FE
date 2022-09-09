import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/nature-mission/creation-nature/creation-nature.component.spec.ts
import { CreationNatureComponent } from './creation-nature.component';

describe('CreationNatureComponent', () => {
  let component: CreationNatureComponent;
  let fixture: ComponentFixture<CreationNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationNatureComponent ]
========
import { AllMissionsComponent } from './all-missions.component';

describe('AllMissionsComponent', () => {
  let component: AllMissionsComponent;
  let fixture: ComponentFixture<AllMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMissionsComponent ]
>>>>>>>> 3ca9c50edd2a350718bc236b58e69e1024066ae9:src/app/missions/all-missions/all-missions.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<<< HEAD:src/app/nature-mission/creation-nature/creation-nature.component.spec.ts
    fixture = TestBed.createComponent(CreationNatureComponent);
========
    fixture = TestBed.createComponent(AllMissionsComponent);
>>>>>>>> 3ca9c50edd2a350718bc236b58e69e1024066ae9:src/app/missions/all-missions/all-missions.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
