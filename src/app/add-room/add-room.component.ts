import { Component, EventEmitter, Output } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent {
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() roomSubmitted: EventEmitter<any> = new EventEmitter<any>();

  roomNumber: string = '';
  building: string = '';

  constructor(private backendService: BackendService) {}

  onSubmit() {
    const newRoomData = { pNumber: this.roomNumber, pBuilding: this.building };

    this.backendService.createRoom(newRoomData).subscribe(
      (response) => {
        console.log('Room created successfully:', response);
        this.roomSubmitted.emit(); // Emit the event to notify the parent component
        this.clearForm();
      },
      (error) => {
        console.error('Error creating room:', error);
      }
    );
  }

  cancel() {
    this.clearForm();
    this.onCancel.emit();
  }

  private clearForm() {
    this.roomNumber = '';
    this.building = '';
  }
}
