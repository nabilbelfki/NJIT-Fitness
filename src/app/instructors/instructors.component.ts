import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent implements OnInit {
  instructors: any[] = [];
  showForm = false;
  newInstructor: any = { FirstName: '', LastName: '', Type: '' };

  constructor(private backendService: BackendService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.hideForm();
    this.getInstructors();
  }

  toggleForm() {
    this.showForm = true;
    this.newInstructor = { FirstName: '', LastName: '', Type: '' };
  }

  onInstructorSubmitted() {
    // After the form is submitted, hide the form and update the instructors list
    this.hideForm();
    this.getInstructors();
  }

  hideForm() {
    this.showForm = false;
  }

  deleteInstructor(event: Event, instructor: any) {
    event.stopPropagation(); // Prevent the button click from propagating

    // Create custom dialog configuration
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you sure you want to delete this instructor?',
    };

    // Show the confirmation dialog with custom configuration
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Make the DELETE request to the backend API using the BackendService
        this.backendService.deleteInstructor(instructor.ID).subscribe(
          (response: any) => {
            console.log('Instructor deleted successfully:', response);
            this.getInstructors(); // Update the instructors list after deletion
          },
          (error) => {
            console.error('Error deleting instructor:', error);
          }
        );
      }
    });
  }

  getInstructors() {
    // Pass an empty string to get all instructors
    this.backendService.getInstructors('').subscribe({
      next: (instructors) => {
        console.log(instructors); // Log the instructors data
        this.instructors = instructors;
      },
      error: (error) => {
        console.error('Error retrieving instructors:', error);
      },
    });
  }
}
