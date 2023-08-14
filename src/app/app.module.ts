import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendService } from './backend/backend.service';
import { UsersComponent } from './users/users.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassexercisesComponent } from './classexercises/classexercises.component';
import { RegistrationComponent } from './registration/registration.component';
import { MembersComponent } from './members/members.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { HomeComponent } from './home/home.component';
import { RoomsModule } from './rooms/rooms.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { MemberComponent } from './member/member.component';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassComponent } from './class/class.component';
import { AddInstructorComponent } from './add-instructor/add-instructor.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddScheduleComponent } from './add-schedule/add-schedule.component'; // Use date-fns or another supported date adapter

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ExercisesComponent,
    ClassesComponent,
    ClassexercisesComponent,
    RegistrationComponent,
    MembersComponent,
    MembershipsComponent,
    InstructorsComponent,
    HomeComponent,
    ScheduleComponent,
    ConfirmationDialogComponent,
    AddMemberComponent,
    MemberComponent,
    AddClassComponent,
    ClassComponent,
    AddInstructorComponent,
    AddScheduleComponent,
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    RoomsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [
    BackendService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
