import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss']
})
export class MfaComponent implements OnInit {

  title: string = 'My Title';
  routerLink: string = '/mfa';

  constructor(private router: Router) {  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSelect() {
    this.router.navigate(['/secure']);
  }

}
