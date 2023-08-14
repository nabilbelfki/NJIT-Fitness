import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomComponent } from '../room/room.component';
import { AddRoomComponent } from '../add-room/add-room.component';

@NgModule({
  declarations: [RoomsComponent, AddRoomComponent,RoomComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule], // Add any other modules that you need here
})
export class RoomsModule {}
