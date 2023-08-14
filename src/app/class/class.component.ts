import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  classForm: FormGroup;
  exerciseForm: FormGroup;
  editing = false;
  isLoading: boolean = true;
  item: any;
  exercises: any;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.classForm = this.formBuilder.group({
      name: [''],
      description: [''],
    });

    this.exerciseForm = this.formBuilder.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const ID = params.get('id') ?? '';
      this.backendService.getClasses(ID).subscribe(
        item => {
          this.item = item[0]; // Since you are getting an array, get the first item (if available)
          console.log('Class:', this.item); // Log the room object
          if (this.item) {
            this.classForm.patchValue({
              name: this.item.Name,
              description: this.item.Description,
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
      this.backendService.getClassExercises('', ID).subscribe(
        exercises => {
          this.exercises = exercises; // Since you are getting an array, get the first item (if available)
          console.log('Exercises:', this.exercises); // Log the exercises object
          if (this.exercises) {
            this.exerciseForm.patchValue({
              name: this.exercises.Name,
              description: this.item.Description,
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

  onEditIconClicked(item: any) {
    this.editing = true;
    this.item = item;
    this.classForm.setValue({
      name: item.Name,
      description: item.Description,
    });
  }

  onSaveChanges() {
    // Get the updated class name and description from the form
    const updatedClassName = this.classForm.get('name')?.value;
    const updatedDescription = this.classForm.get('description')?.value;

    // Get the class ID from the URL parameter (if available)
    const classIdFromUrl = this.route.snapshot.paramMap.get('id');
    const classId = classIdFromUrl ? parseInt(classIdFromUrl, 10) : null;

    // Check if the form controls are not null before proceeding
    if (updatedClassName !== null && updatedDescription !== null && classId !== null) {
      // Create the class object with the updated data
      const updatedClass = {
        Name: updatedClassName,
        Description: updatedDescription
      };

      // Convert classId to unknown first, then to a string when calling getClasses
      const classIdStr = classId as unknown as string;

      // Call the backend service to update the class
      this.backendService.updateClass(classId as number, updatedClass).subscribe(
        (response) => {
          // Handle success response (if needed)
          console.log('Class updated successfully:', response);

          // Update the this.room object with the new data from the form
          this.item.Name = updatedClassName;
          this.item.Description = updatedDescription;
        },
        (error) => {
          // Handle error (if needed)
          console.error('Error updating class:', error);
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
