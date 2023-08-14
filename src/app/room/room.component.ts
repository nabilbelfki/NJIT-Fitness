import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-room', // Update the selector to match the component name
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  roomForm: FormGroup;
  editing = false;
  isLoading: boolean = true;
  room: any;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.roomForm = this.formBuilder.group({
      number: [''],
      building: [''],
    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const roomId = params.get('id') ?? '';
      this.backendService.getRooms(roomId).subscribe(
        room => {
          this.room = room[0]; // Since you are getting an array, get the first item (if available)
          console.log('Room:', this.room); // Log the room object
          if (this.room) {
            this.roomForm.patchValue({
              number: this.room.Number,
              building: this.room.Building,
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
  

  getRoom(ID: string) {
    // Convert the ID to a number before making the API call
    const roomId = parseInt(ID, 10);

    this.backendService.getRooms(roomId.toString()).subscribe(
      (room) => {
        this.room = room;
        if (this.room) {
          this.roomForm.patchValue({
            number: this.room.Number,
            building: this.room.Building,
          });
        }
      },
      (error) => {
        console.error('Error fetching room details:', error);
      },
      () => {
        // The request has completed, set isLoading to false
        this.isLoading = false;
      }
    );
  }

  onEditIconClicked(room: any) {
    this.editing = true;
    this.room = room;
    this.roomForm.setValue({
      number: room.Number,
      building: room.Building,
    });
  }

  onSaveChanges() {
    // Get the updated room number and building from the form
    const updatedRoomNumber = this.roomForm.get('number')?.value;
    const updatedBuilding = this.roomForm.get('building')?.value;

    // Get the room ID from the URL parameter (if available)
    const roomIdFromUrl = this.route.snapshot.paramMap.get('id');
    const roomId = roomIdFromUrl ? parseInt(roomIdFromUrl, 10) : null;

    // Check if the form controls are not null before proceeding
  // Check if the form controls are not null before proceeding
  if (updatedRoomNumber !== null && updatedBuilding !== null && roomId !== null) {
    // Create the room object with the updated data
    const updatedRoom = {
      Number: updatedRoomNumber,
      Building: updatedBuilding
    };

    // Convert roomId to unknown first, then to a string when calling getRooms
    const roomIdStr = roomId as unknown as string;

    // Call the backend service to update the room
    this.backendService.updateRoom(roomId as number, updatedRoom).subscribe(
      (response) => {
        // Handle success response (if needed)
        console.log('Room updated successfully:', response);

        // Update the this.room object with the new data from the form
        this.room.Number = updatedRoomNumber;
        this.room.Building = updatedBuilding;
      },
      (error) => {
        // Handle error (if needed)
        console.error('Error updating room:', error);
      }
    );
  }

  // After saving the changes, set editing to false to go back to view mode
  this.editing = false;
}
  onCancelEdit() {
    // If the user cancels the edit, set editing to false to go back to view mode
    this.editing = false;
  }
  
}