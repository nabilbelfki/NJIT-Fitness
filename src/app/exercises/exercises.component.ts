import { Component } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent {
  exercises: any[] = [];
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    // Example usage:
    this.backendService.getExercises('').subscribe(
      exercises => {
        console.log(exercises); // Handle the response data here
        this.exercises = exercises;
      },
      error => {
        console.error(error); // Handle the error here
      }
    );
  }
}
