import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  showForm = false; // Add this property to the component
  newRoom: any = { pNumber: '', pBuilding: '' }; // Add this property to the component

  constructor(private backendService: BackendService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.hideForm();
    this.getRooms(); 
  }

  toggleForm() {
    this.showForm = true;
    this.newRoom = { pNumber: '', pBuilding: '' };
  }

  onRoomSubmitted() {
    // After the form is submitted, hide the form and update the rooms list
    this.hideForm();
    this.getRooms();
  }

  hideForm() {
    this.showForm = false;
  }

  showTrashIcon(room: any) {
    room.showTrash = true;
  }

  hideTrashIcon() {
    this.rooms.forEach((room: any) => (room.showTrash = false));
  }

  deleteRoom(event: Event, room: any) {
    event.stopPropagation(); // Prevent the anchor link from routing

    // Create custom dialog configuration
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you sure you want to delete this room?',
    };

    // Show the confirmation dialog with custom configuration
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Make the DELETE request to the backend API using the BackendService
        this.backendService.deleteRoom(room.ID).subscribe(
          (response: any) => {
            console.log('Room deleted successfully:', response);
            this.getRooms(); // Update the rooms list after deletion
          },
          (error) => {
            console.error('Error deleting room:', error);
          }
        );
      }
    });
  }

  

  getRooms() {
    // Pass an empty string to get all rooms
    this.backendService.getRooms('').subscribe({
      next: (rooms) => {
        console.log(rooms); // Log the skills data
        this.rooms = rooms;
      },
      error: (error) => {
        console.error('Error retrieving rooms:', error);
      },
    });
  }

  navigateToRoom(roomId: any) {
    this.router.navigate(['/room', roomId]);
  }
}
