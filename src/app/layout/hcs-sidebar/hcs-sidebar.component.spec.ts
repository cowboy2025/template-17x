import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcsSidebarComponent } from './hcs-sidebar.component';

describe('HcsSidebarComponent', () => {
  let component: HcsSidebarComponent;
  let fixture: ComponentFixture<HcsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcsSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
