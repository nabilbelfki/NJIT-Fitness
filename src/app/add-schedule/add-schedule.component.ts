import { Component, EventEmitter, Output } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent {
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() scheduleSubmitted: EventEmitter<any> = new EventEmitter<any>();

  rooms: any[] = [];
  classes: any[] = [];
  instructors: any[] = [];
  startDate: Date | null = null;
  classID: number = 1; // Add these properties
  instructorID: number = 1;
  roomID: number = 1;
  startTime: string = '';
  duration: string = '';
  

  constructor(private backendService: BackendService) {
    this.getRooms();
    this.getClasses();
    this.getInstructors();
  }

  getRooms() {
    this.backendService.getRooms('').subscribe(
      (rooms: any[]) => {
        this.rooms = rooms;
        console.log(rooms);
      },
      (error) => {
        console.error('Error fetching rooms:', error);
      }
    );
  }

  getClasses() {
    this.backendService.getClasses('').subscribe(
      (classes: any[]) => {
        this.classes = classes;
        console.log(classes);
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  getInstructors() {
    this.backendService.getInstructors('').subscribe(
      (instructors: any[]) => {
        this.instructors = instructors;
        console.log(instructors);
      },
      (error) => {
        console.error('Error fetching instructors:', error);
      }
    );
  }

  onSubmit() {
    const newScheduleData = {
      ClassID: this.classID,
      InstructorID: this.instructorID,
      RoomID: this.roomID,
      StartTime: this.startTime,
      Duration: this.duration
    };

    this.backendService.createSchedule(newScheduleData).subscribe(
      (response) => {
        console.log('Schedule created successfully:', response);
        this.scheduleSubmitted.emit(); // Emit the event to notify the parent component
        this.resetForm();
      },
      (error) => {
        console.error('Error creating schedule:', error);
      }
    );
  }

  combineDateAndTime(date: Date | null, time: string): Date {
    if (!date) {
      throw new Error('Invalid date'); // Handle this case as per your requirements
    }
  
    const timeParts = time.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const combinedDate = new Date(date);
    combinedDate.setHours(hours);
    combinedDate.setMinutes(minutes);
    return combinedDate;
  }
  

  cancel() {
    this.resetForm();
    this.onCancel.emit();
  }

  private resetForm() {
    this.classID = 0;
    this.instructorID = 0;
    this.roomID = 0;
    this.startTime = '';
    this.duration = '';
  }

  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
  }
}
