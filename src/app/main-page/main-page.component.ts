import { Component, OnInit } from '@angular/core';

interface Option {
  name: string,
  code: string
}


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  calendarValue!:Date;
  cities!:Option[];
  listboxValue!:Option;
  constructor() { }

  ngOnInit() {

    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }

}
