import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  memberForm: FormGroup;
  editing = false;
  isLoading: boolean = true;
  member: any;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.memberForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      memberType: [''],
      address: [''],
      city: [''],
      state: [''],
      zipcode: [''],
      country: ['']
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const member = params.get('id') ?? '';
      console.log(member);
      this.backendService.getMembers(member).subscribe(
        member => {
          this.member = member[0]; // Since you are getting an array, get the first item (if available)
          console.log('Member:', this.member); // Log the member object
          if (this.member) {
            this.memberForm.patchValue({
              firstName: this.member.FirstName,
              lastName: this.member.LastName,
              memberType: this.member.Type,
              address: this.member.Address,
              city: this.member.City,
              state: this.member.State,
              zipcode: this.member.Zipcode,
              country: this.member.Country
            });
          }
        },
        error => {
          console.error(error);
        },
        () => {
          // The request has completed, set isLoading to false
          this.isLoading = false;
        }
      );
    });
  }

  onSaveChanges() {
    // Get the updated member details from the form
    const updatedFirstName = this.memberForm.get('firstName')?.value;
    const updatedLastName = this.memberForm.get('lastName')?.value;
    const updatedMemberType = this.memberForm.get('memberType')?.value;
    const updatedAddress = this.memberForm.get('address')?.value;
    const updatedCity = this.memberForm.get('city')?.value;
    const updatedState = this.memberForm.get('state')?.value;
    const updatedZipcode = this.memberForm.get('zipcode')?.value;
    const updatedCountry = this.memberForm.get('country')?.value;

    // Get the member ID from the URL parameter (if available)
    const memberIdFromUrl = this.route.snapshot.paramMap.get('id');
    const memberId = memberIdFromUrl ? parseInt(memberIdFromUrl, 10) : null;

    // Check if the form controls are not null before proceeding
    if (updatedFirstName !== null && updatedLastName !== null && updatedMemberType !== null && memberId !== null) {
      // Create the updated member object
      const updatedMember = {
        Type: updatedMemberType,
        FirstName: updatedFirstName,
        LastName: updatedLastName,
        Address: updatedAddress,
        City: updatedCity,
        State: updatedState,
        Zipcode: updatedZipcode,
        Country: updatedCountry
      };

      // Call the backend service to update the member
      this.backendService.updateMember(memberId, updatedMember).subscribe(
        (response) => {
          // Handle success response (if needed)
          console.log('Member updated successfully:', response);

          // Update the this.member object with the new data from the form
          this.member.FirstName = updatedFirstName;
          this.member.LastName = updatedLastName;
          this.member.Type = updatedMemberType;
          this.member.Address = updatedAddress;
          this.member.City = updatedCity;
          this.member.State = updatedState;
          this.member.Zipcode = updatedZipcode;
          this.member.Country = updatedCountry;
        },
        (error) => {
          // Handle error (if needed)
          console.error('Error updating member:', error);
        }
      );
    }

    // After saving the changes, set editing to false to go back to view mode
    this.editing = false;
  }

  onEdit() {
    this.editing = true;
  }

  onCancelEdit() {
    // If the user cancels the edit, set editing to false to go back to view mode
    this.editing = false;
  }
}
