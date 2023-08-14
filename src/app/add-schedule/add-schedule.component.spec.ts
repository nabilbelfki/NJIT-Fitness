import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleComponent } from './add-schedule.component';

describe('AddScheduleComponent', () => {
  let component: AddScheduleComponent;
  let fixture: ComponentFixture<AddScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScheduleComponent]
    });
    fixture = TestBed.createComponent(AddScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
