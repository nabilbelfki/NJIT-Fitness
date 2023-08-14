import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipsComponent } from './memberships.component';

describe('MembershipsComponent', () => {
  let component: MembershipsComponent;
  let fixture: ComponentFixture<MembershipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipsComponent]
    });
    fixture = TestBed.createComponent(MembershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
