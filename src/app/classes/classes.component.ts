import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  classes: any[] = [];
  showForm = false;
  newClass: any = { name: '', description: '' };

  constructor(private backendService: BackendService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.hideForm();
    this.getClasses();
  }

  toggleForm() {
    this.showForm = true;
    this.newClass = { name: '', description: '' };
  }

  onClassSubmitted() {
    this.hideForm();
    this.getClasses();
  }

  hideForm() {
    this.showForm = false;
  }

  showTrashIcon(item: any) {
    item.showTrash = true;
  }

  hideTrashIcon() {
    this.classes.forEach((item: any) => (item.showTrash = false));
  }

  deleteClass(event: Event, item: any) {
    event.stopPropagation(); // Prevent the anchor link from routing

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you sure you want to delete this class?',
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.backendService.deleteClass(item.ID).subscribe(
          (response: any) => {
            console.log('Class deleted successfully:', response);
            this.getClasses();
          },
          (error) => {
            console.error('Error deleting class:', error);
          }
        );
      }
    });
  }

  getClasses() {
    this.backendService.getClasses('').subscribe({
      next: (classes) => {
        console.log(classes);
        this.classes = classes;
      },
      error: (error) => {
        console.error('Error retrieving classes:', error);
      },
    });
  }

  navigateToClass(ID: number) {
    console.log(ID)
    this.router.navigate(['/class', ID]);
  }
}
