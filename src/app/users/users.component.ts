import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {
  user: any = {
    firstname: '',
    lastname: '',
    phone: '',
    username: '',
    password: '',
    email: ''
  };

  signInData: any = {
    username: '',
    password: ''
  };

  gradientColors: string[] = [];
  colorChangeInterval: any;
  showRegistration: boolean = true;

  constructor(
    private backendService: BackendService,
    private elementRef: ElementRef,
    private router: Router
  ) {}

  createSession(user: any): void {
    // Store user data in session storage
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  
  redirectToSurgeriesPage(): void {
    // Redirect to surgeries page
    window.location.href = '/surgeries'
  }
  

  registerUser() {
    this.backendService.createUser(this.user).subscribe(
      (response) => {
        console.log('User created successfully');
        // Reset the form or perform any other necessary actions
        // Create session and store user data
        this.createSession(this.user);
        // Redirect to surgeries page
        this.redirectToSurgeriesPage();
      },
      (error) => {
        console.error('Error creating user:', error);
        // Handle the error accordingly
      }
    );
  }
  

  signInUser() {
    const { username, password } = this.signInData;
  
    this.backendService.signInUser({ pUsername: username, pPassword: password }).subscribe(
      (response) => {
        console.log('User signed in successfully', response);
        // Check if a user record is returned and handle accordingly
        if (response.user) {
          // User record exists
          // Create session and store user data
          this.createSession(response.user);
          // Redirect to surgeries page
          this.redirectToSurgeriesPage();
        } else {
          // User not found or invalid credentials
        }
      },
      (error) => {
        console.error('Error signing in user:', error);
        // Handle the error accordingly
      }
    );
  }
  
  
  
  

  ngOnInit(): void {
    this.startColorChangeAnimation();
  }

  ngAfterViewInit(): void {
    this.updateButtonColor();
  }

  ngOnDestroy(): void {
    this.stopColorChangeAnimation();
  }

  updateButtonColor(): void {
    const rightSection = this.elementRef.nativeElement.querySelector('.right-section');
    const computedStyle = getComputedStyle(rightSection);
    const backgroundColor = computedStyle.backgroundColor;

    const rgbValues = backgroundColor.match(/\d+/g);
    if (rgbValues) {
      const r = parseInt(rgbValues[0]);
      const g = parseInt(rgbValues[1]);
      const b = parseInt(rgbValues[2]);

      // Calculate the luminance value
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      // Determine the appropriate text color based on the luminance value
      const textColor = luminance > 0.5 ? 'black' : 'white';

      const buttonElement = this.elementRef.nativeElement.querySelector('.right-section button');
      buttonElement.style.color = textColor;
      buttonElement.style.backgroundColor = textColor === 'white' ? 'black' : 'white';
    }
  }

  startColorChangeAnimation(): void {
    this.generateGradientColors();
    this.applyGradientColors();

    this.colorChangeInterval = setInterval(() => {
      this.generateGradientColors();
      this.applyGradientColors();
      this.updateButtonColor();
    }, 5000); // Change colors every 5 seconds (adjust as needed)
  }

  stopColorChangeAnimation(): void {
    clearInterval(this.colorChangeInterval);
  }

  generateGradientColors(): void {
    const color1 = this.getRandomNeonColor();
    const color2 = this.getRandomNeonColor();
    this.gradientColors = [color1, color2];
  }

  applyGradientColors(): void {
    const rightSection = this.elementRef.nativeElement.querySelector('.right-section');
    const gradientValue = `linear-gradient(to bottom right, ${this.gradientColors[0]}, ${this.gradientColors[1]})`;
    rightSection.style.backgroundImage = gradientValue;
    rightSection.style.transition = 'background-image 0.5s';
  }

  getRandomNeonColor(): string {
    const neonColors = ['#ff00ff', '#00ff00', '#00ffff', '#ffff00', '#ff0000', '#0000ff'];
    return neonColors[Math.floor(Math.random() * neonColors.length)];
  }
}
