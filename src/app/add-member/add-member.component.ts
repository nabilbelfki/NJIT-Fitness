import { Component, EventEmitter, Output } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent {
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() memberSubmitted: EventEmitter<any> = new EventEmitter<any>();

  firstName: string = '';
  lastName: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zipcode: string = '';
  country: string = '';
  memberType: string = 'Student';
  memberships: any[] = [];

  constructor(private backendService: BackendService) {
    this.getMemberships();
  }

  onSubmit() {
    const newMemberData = {
      Type: this.memberType,
      FirstName: this.firstName,
      LastName: this.lastName,
      Address: this.address,
      City: this.city,
      State: this.state,
      Zipcode: this.zipcode,
      Country: this.country
    };

    this.backendService.createMember(newMemberData).subscribe(
      (response) => {
        console.log('Member created successfully:', response);
        this.memberSubmitted.emit(); // Emit the event to notify the parent component
        this.clearForm();
      },
      (error) => {
        console.error('Error creating member:', error);
      }
    );
  }

  getMemberships() {
    this.backendService.getMemberships('').subscribe(
      (memberships: string[]) => {
        this.memberships = memberships;
      },
      (error) => {
        console.error('Error fetching membership options:', error);
      }
    );
  }

  cancel() {
    this.clearForm();
    this.onCancel.emit();
  }

  private clearForm() {
    this.firstName = '';
    this.lastName = '';
    this.address = '';
    this.city = '';
    this.state = '';
    this.zipcode = '';
    this.country = '';
    this.memberType = '';
  }
}
