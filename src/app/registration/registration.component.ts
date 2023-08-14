import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registrations: any[] = [];
  hasSelectedRegistrations: boolean = false;
  isAllSelected: boolean = false;
  showAddFormFlag: boolean = false;
  scheduleId: string | null = '';
  selectedMember: number | null = null;
  members: any[] = []; // Populate this with member data
  schedules: any[] = []; // Populate this with schedule data

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private backendService: BackendService
  ) {}

  ngOnInit(): void {

    this.backendService.getMembers('').subscribe(
      members => {
        console.log('Members:', members);
        this.members = members;
      },
      error => {
        console.error('Error fetching members:', error);
      }
    );
  
    // Fetch schedules
    this.backendService.getSchedule('', '', '', '').subscribe(
      schedules => {
        console.log('Schedules:', schedules);
        this.schedules = schedules;
      },
      error => {
        console.error('Error fetching schedules:', error);
      }
    );

    this.route.paramMap.subscribe(params => {
      const scheduleId = params.get('id'); // Use 'id' to match the parameter in the route configuration
      console.log(scheduleId); // Verify if the ID is correctly retrieved
      this.scheduleId = scheduleId;
      if (scheduleId) {
        this.backendService.getRegistration('', '', scheduleId).subscribe(
          registrations => {
            console.log('Registrations:', registrations);
            this.registrations = registrations;
          },
          error => {
            console.error('Error fetching registrations:', error);
          }
        );
      }
    });
  }

  showAddForm() {
    this.showAddFormFlag = true;
  }

  cancelAddForm() {
    this.showAddFormFlag = false;
  }

  addRegistration() {
    // Check if a member is selected
    if (this.selectedMember && this.scheduleId) {
      const registrationData = {
        MemberID: this.selectedMember, // Use the selected member's MemberID
        ScheduleID: this.scheduleId,
      };
    
      // Call your backend service method to add the registration
      this.backendService.createRegistration(registrationData).subscribe(
        response => {
          console.log('Registration added:', response);
          if (this.scheduleId) {
            this.fetchRegistrations(this.scheduleId);
          }
          this.cancelAddForm();
        },
        error => {
          console.error('Error adding registration:', error);
        }
      );
    }
  }
  
  // Define a method to fetch registrations using the provided schedule ID
  fetchRegistrations(scheduleId: string) {
    this.backendService.getRegistration('', '', scheduleId).subscribe(
      registrations => {
        console.log('Registrations:', registrations);
        this.registrations = registrations;
      },
      error => {
        console.error('Error fetching registrations:', error);
      }
    );
  }
  
  
  
  

  updateSelectedRegistrations() {
    this.hasSelectedRegistrations = this.registrations.some(registration => registration.selected);
  }

  toggleAllSelection() {
    this.isAllSelected = !this.isAllSelected;
    this.registrations.forEach(registration => registration.selected = this.isAllSelected);
    this.updateSelectedRegistrations();
  }

  deleteRegistrations() {
    const selectedRegistrationIDs = this.registrations
      .filter(registration => registration.selected)
      .map(registration => registration.RegistrationID);
        
    if (selectedRegistrationIDs.length === 0) {
      return; // No selected registrations to delete
    }
  
    if (confirm('Are you sure you want to delete these registrations?')) {
      // Loop through the selected registration IDs and delete them one by one
      selectedRegistrationIDs.forEach(registrationID => {
        this.backendService.deleteRegistration(registrationID).subscribe(
          response => {
            console.log(`Registration ${registrationID} deleted:`, response);
            // Update the registrations list after deletion
            this.registrations = this.registrations.filter(registration => registration.RegistrationID !== registrationID);
            this.hasSelectedRegistrations = false; // Reset the selection state
          },
          error => {
            console.error(`Error deleting registration ${registrationID}:`, error);
          }
        );
      });
    }
  }
  
}
