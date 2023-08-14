import { Component } from '@angular/core';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.scss']
})
export class MembershipsComponent {
  memberships: any[] = [];
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    // Example usage:
    this.backendService.getMemberships('').subscribe(
      memberships => {
        console.log(memberships); // Handle the response data here
        this.memberships = memberships;
      },
      error => {
        console.error(error); // Handle the error here
      }
    );
  }
}
