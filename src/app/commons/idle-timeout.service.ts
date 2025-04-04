import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdleTimeoutService {
  private idleTimeout: any;
  private idleDuration = 12 * 60 * 1000; // 12 minutes in milliseconds
  public onTimeout = new Subject<void>(); // To trigger modal
  private isPaused = false;

  startWatching() {
    this.resetTimer();
  }
  resetTimer() {
    if (this.isPaused) return; // Do nothing if idle timeout is paused
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
    }
    this.idleTimeout = setTimeout(() => {
      this.onTimeout.next(); // Trigger the timeout event if idle duration elapses
    }, this.idleDuration);
  }
  stopWatching() {
    clearTimeout(this.idleTimeout);
  }
  pause() {
    this.isPaused = true;
    this.stopWatching();
  }
  resume() {
    this.isPaused = false;
    this.startWatching();
  }
}
