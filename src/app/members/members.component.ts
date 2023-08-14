import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  members: any[] = [];
  showForm = false; // Add this property to the component
  newMember: any = { FirstName: '', LastName: '', Type: '' }; // Add this property to the component

  constructor(private backendService: BackendService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.hideForm();
    this.getMembers(); 
  }

  toggleForm() {
    this.showForm = true;
    this.newMember = { FirstName: '', LastName: '', Type: '' };
  }

  onMemberSubmitted() {
    // After the form is submitted, hide the form and update the members list
    this.hideForm();
    this.getMembers();
  }

  hideForm() {
    this.showForm = false;
  }

  deleteMember(event: Event, member: any) {
    event.stopPropagation(); // Prevent the anchor link from routing

    // Create custom dialog configuration
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you sure you want to delete this member?',
    };

    // Show the confirmation dialog with custom configuration
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Make the DELETE request to the backend API using the BackendService
        this.backendService.deleteMember(member.ID).subscribe(
          (response: any) => {
            console.log('Member deleted successfully:', response);
            this.getMembers(); // Update the members list after deletion
          },
          (error) => {
            console.error('Error deleting member:', error);
          }
        );
      }
    });
  }

  getMembers() {
    // Pass an empty string to get all members
    this.backendService.getMembers('').subscribe({
      next: (members) => {
        console.log(members); // Log the members data
        this.members = members;
      },
      error: (error) => {
        console.error('Error retrieving members:', error);
      },
    });
  }

  navigateToMember(memberId: any) {
    this.router.navigate(['/member', memberId]);
  }
}
