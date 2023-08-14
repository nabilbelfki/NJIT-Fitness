import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstructorComponent } from './add-instructor.component';

describe('AddInstructorComponent', () => {
  let component: AddInstructorComponent;
  let fixture: ComponentFixture<AddInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInstructorComponent]
    });
    fixture = TestBed.createComponent(AddInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
