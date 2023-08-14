import { Component, EventEmitter, Output } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-instructor.component.html',
  styleUrls: ['./add-instructor.component.scss'],
})
export class AddInstructorComponent {
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() instructorSubmitted: EventEmitter<any> = new EventEmitter<any>();

  firstName: string = '';
  lastName: string = '';
  instructorType: string = 'Internal';
  instructorTypes: any[] = []; // Assuming you have a method to fetch instructor types from the backend

  // Add the following properties
  salary: number = 0;
  hours: number = 0;
  rate: number = 0;

  constructor(private backendService: BackendService) {}

  onSubmit() {
    const newInstructorData = {
      Type: this.instructorType,
      FirstName: this.firstName,
      LastName: this.lastName,
      Salary: this.salary, // Add the salary property for internal instructor
      Hours: this.hours,   // Add the hours property for external instructor
      Rate: this.rate,     // Add the rate property for external instructor
    };

    this.backendService.createInstructor(newInstructorData).subscribe(
      (response) => {
        console.log('Instructor created successfully:', response);
        this.instructorSubmitted.emit(); // Emit the event to notify the parent component
        this.clearForm();
      },
      (error) => {
        console.error('Error creating instructor:', error);
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
    this.instructorType = '';
    this.salary = 0;
    this.hours = 0;
    this.rate = 0;
  }
}
