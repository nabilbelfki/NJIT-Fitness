import { Component, ChangeDetectionStrategy, OnInit , ChangeDetectorRef } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit {
  schedules: any[] = [];
  showForm = false;

  constructor(private backendService: BackendService
    , private cd: ChangeDetectorRef
    , private dialog: MatDialog
    , private router: Router) {}

  ngOnInit(): void {
    this.hideForm();
    // Fetch schedule data from the backend service
    this.backendService.getSchedule('', '', '', '').subscribe(
      (schedule: any[]) => {
        this.schedules = schedule;
        //console.log(schedule)
        this.cd.detectChanges(); // Manually trigger change detection
        
      },
      (error) => {
        console.error(error); // Handle the error here
      }
    );
  }

  toggleForm() {
    this.showForm = true;
  }

  onScheduleSubmitted() {
    // After the form is submitted, hide the form and update the schedules list
    this.hideForm();
    this.getSchedules();
  }

  hideForm() {
    this.showForm = false;
  }

  getSchedules() {
    // Fetch schedules from the backend
    this.backendService.getSchedule('','','','').subscribe(
      (schedules) => {
        console.log(schedules); // Log the schedules data
        this.schedules = schedules;
      },
      (error) => {
        console.error('Error retrieving schedules:', error);
      }
    );
  }


  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  navigateToRegistration(schedule: any) {
    // Navigate to registration route with the schedule's ID as a parameter
    this.router.navigate(['/registration', schedule.ID]);
  }
}
