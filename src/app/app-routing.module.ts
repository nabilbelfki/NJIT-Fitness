import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './room/room.component';
import { HomeComponent } from './home/home.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassComponent } from './class/class.component';
import { ClassexercisesComponent } from './classexercises/classexercises.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { RegistrationComponent } from './registration/registration.component';
import { MembersComponent } from './members/members.component';
import { MemberComponent } from './member/member.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { InstructorsComponent } from './instructors/instructors.component';

const routes: Routes = [
  { path: 'rooms', component: RoomsComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'class/:id', component: ClassComponent },
  { path: 'classexercises', component: ClassexercisesComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'registration/:id', component: RegistrationComponent },
  { path: 'members', component: MembersComponent },
  { path: 'member/:id', component: MemberComponent },
  { path: 'memberships', component: MembershipsComponent },
  { path: 'instructors', component: InstructorsComponent },
  { path: '', component: HomeComponent }, // Set HomeComponent as the default route
  { path: '**', component: HomeComponent }, // Optional: Handle any other unknown routes with HomeComponent
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
