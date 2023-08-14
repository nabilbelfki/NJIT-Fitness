import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassexercisesComponent } from './classexercises.component';

describe('ClassexercisesComponent', () => {
  let component: ClassexercisesComponent;
  let fixture: ComponentFixture<ClassexercisesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassexercisesComponent]
    });
    fixture = TestBed.createComponent(ClassexercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
