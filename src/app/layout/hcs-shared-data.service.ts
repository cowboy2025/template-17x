import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HcsSharedDataService {

  private dohTopMenu = new BehaviorSubject<any>(null);
  currentdohTopMenu = this.dohTopMenu.asObservable();
  collapse = new BehaviorSubject(false); // make this to True to collapse sidebar initially.

  constructor() { }

  storeTopMenu(dohTopMenu: any) {
    this.dohTopMenu.next(dohTopMenu);
  }
}
