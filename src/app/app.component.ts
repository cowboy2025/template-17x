import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdleTimeoutService } from './commons/idle-timeout.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HCSUtils } from './commons/hcs-util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appTitle: string = 'HCS Prime NG Template';
  mobileView: boolean = false;
  countdown: number = 180;
  progressPercent: number = 100;
  countdownInterval: any;
  timeDisplay: any;
  displayModal: boolean = false;
  url: any;
  env: SafeResourceUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private idleTimeoutService: IdleTimeoutService,
    private sanitizer: DomSanitizer
  ) {
    this.mobileView = window.innerWidth < 768 ? true : false;
    this.url =
      'https://hcsnavbar.health.ny.gov/index.html?profile=' +
      HCSUtils.enviromentTopBar +
      '&appTitle=' +
      this.appTitle;
    // +'&logoutUrl=' + encodeURIComponent(HCSUtils.appLogoutUrl);
    this.env = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  get token() {
    return null;
  }

  get hasValidToken(): boolean {
    //    console.log("****",this.authService.hasValidToken(), this.authService.identityClaims)
    return true;
  }

  // Logout the user and navigate to the login page
  logout() {
    this.displayModal = false;
    this.router.navigate(['/login']);
  }

  // Reset the idle timer and close the session timeout modal
  stayConnected() {
    this.idleTimeoutService.resetTimer(); // Reset the idle timer
    this.displayModal = false;
    this.resetCountdown();
    // Hide the modal
  }

  // Reset the countdown to its initial value
  resetCountdown() {
    clearInterval(this.countdownInterval); // Clear any existing countdown
    this.countdown = 180; // Set countdown to 180 seconds
  }

  // Start the countdown timer for the session timeout
  startCountdown() {
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.progressPercent = (this.countdown * 100) / 180;
        this.countdown--;
        this.timeDisplay = this.formatTime(this.countdown);
      } else {
        this.logout(); // Log the user out when the countdown reaches zero
      }
    }, 1000);
    this.countdownInterval = interval; // Save the interval for later use
  }

  // Format the countdown timer into minutes and seconds
  formatTime(totalSeconds: number): string {
    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  }
}
