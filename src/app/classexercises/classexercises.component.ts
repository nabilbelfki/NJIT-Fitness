import { Component } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-classexercises',
  templateUrl: './classexercises.component.html',
  styleUrls: ['./classexercises.component.scss']
})
export class ClassexercisesComponent {
  classexercises: any[] = [];
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {

    this.backendService.getClassExercises('','').subscribe(
      classexercises => {
        console.log(classexercises); // Handle the response data here
        this.classexercises = classexercises;
      },
      error => {
        console.error(error); // Handle the error here
      }
    );
  }
}
