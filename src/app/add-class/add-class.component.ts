import { Component, EventEmitter, Output } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss'],
})
export class AddClassComponent {
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() classSubmitted: EventEmitter<any> = new EventEmitter<any>();

  name: string = '';
  description: string = '';

  constructor(private backendService: BackendService) {}

  onSubmit() {
    const newClassData = {
      Name: this.name,
      Description: this.description,
    };

    this.backendService.createClass(newClassData).subscribe(
      (response) => {
        console.log('Class created successfully:', response);
        this.classSubmitted.emit(); // Emit the event to notify the parent component
        this.clearForm();
      },
      (error) => {
        console.error('Error creating class:', error);
      }
    );
  }

  cancel() {
    this.clearForm();
    this.onCancel.emit();
  }

  private clearForm() {
    this.name = '';
    this.description = '';
  }
}
