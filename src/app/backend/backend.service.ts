import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://localhost:14291/api'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}
  
  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, user);
  }

  signInUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user);
  }

  createClass(classItem: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/classes`, classItem);
  }

  getClasses(Classes: string): Observable<any[]> {
    let params = new HttpParams();
    if (Classes) {
      params = params.set('Classes', Classes);
    }
    return this.http.get<any[]>(`${this.baseUrl}/classes`, { params });
  }

  updateClass(ID: number, updatedClass: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/classes/${ID}`, updatedClass);
  }

  deleteClass(roomID: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/classes/${roomID}`);
  }

  getClassExercises(Exercises: string, Classes: string): Observable<any[]> {
    let params = new HttpParams();
    if (Exercises) {
      params = params.set('Exercises', Exercises);
    }
    if (Classes) {
      params = params.set('Classes', Classes);
    }
    return this.http.get<any[]>(`${this.baseUrl}/classexercises`, { params });
  }
  

  getExercises(Exercises: string): Observable<any[]> {
    let params = new HttpParams();
    if (Exercises) {
      params = params.set('Exercises', Exercises);
    }
    return this.http.get<any[]>(`${this.baseUrl}/exercises`, { params });
  }

  createMember(member: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/members`, member);
  }

  getMembers(Members: string): Observable<any[]> { // Change 'Members' to 'id'
    let params = new HttpParams();
    if (Members) {
      console.log(Members);
      params = params.set('Members', Members); // Change 'Members' to 'id'
    }
    return this.http.get<any[]>(`${this.baseUrl}/members`, { params });
  }

  updateMember(memberId: number, updatedMember: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/members/${memberId}`, updatedMember);
  }

  deleteMember(Member: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/members/${Member}`);
  }
  
  getMemberships(Memberships: string): Observable<any[]> {
    let params = new HttpParams();
    if (Memberships) {
      params = params.set('Memberships', Memberships);
    }
    return this.http.get<any[]>(`${this.baseUrl}/memberships`, { params });
  }

  createInstructor(instructor: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/instructors`, instructor);
  }

  getInstructors(Instructors: string): Observable<any[]> {
    let params = new HttpParams();
    if (Instructors) {
      params = params.set('Instructors', Instructors);
    }
    return this.http.get<any[]>(`${this.baseUrl}/instructors`, { params });
  }

  deleteInstructor(ID: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/instructors/${ID}`);
  }

  createRegistration(registration: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registration`, registration);
  }

  getRegistration(IDs: string, Members: string, Schedule: string): Observable<any[]> {
    let params = new HttpParams();
    if (IDs) {
      params = params.set('IDs', IDs);
    }
    if (Members) {
      params = params.set('Members', Members);
    }
    if (Schedule) {
      params = params.set('Schedule', Schedule);
    }
    return this.http.get<any[]>(`${this.baseUrl}/registration`, { params });
  }

  deleteRegistration(ID: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/registration/${ID}`);
  }
  
  getWages(Wages: string): Observable<any[]> {
    let params = new HttpParams();
    if (Wages) {
      params = params.set('Wages', Wages);
    }
    return this.http.get<any[]>(`${this.baseUrl}/payroll`, { params });
  }
  
  getSchedule(IDs: string, Classes: string, Instructors: string, Rooms: string): Observable<any[]> {
    let params = new HttpParams();
    if (IDs) {
      params = params.set('IDs', IDs);
    }
    if (Classes) {
      params = params.set('Classes', Classes);
    }
    if (Instructors) {
      params = params.set('Instructors', Instructors);
    }
    if (Rooms) {
      params = params.set('Rooms', Rooms);
    }
    return this.http.get<any[]>(`${this.baseUrl}/schedule`, { params });
  }

  createSchedule(schedule: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/schedule`, schedule);
  }
  
  getRooms(Rooms: string): Observable<any[]> {
    let params = new HttpParams();
    if (Rooms) {
      params = params.set('Rooms', Rooms); // Set the parameter name as 'Rooms'
    }
    return this.http.get<any[]>(`${this.baseUrl}/rooms`, { params });
  }
  

  createRoom(room: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/rooms`, room);
  }

  deleteRoom(roomID: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/rooms/${roomID}`);
  }
  
  updateRoom(roomID: number, room: any): Observable<any> {
    const params = new HttpParams().set('id', roomID.toString());
    return this.http.put<any>(`${this.baseUrl}/rooms/${roomID}`, room, { params });
  }

}
