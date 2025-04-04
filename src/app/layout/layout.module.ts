import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { HcsSidebarComponent } from './hcs-sidebar/hcs-sidebar.component';
import {MenuModule} from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBars, faHouse, faLifeRing, faPencil, faSearch,faSignOut,faTable,faUser, faUserPlus, faAngleDoubleLeft, faMobile, faAngleLeft } from '@fortawesome/pro-light-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faApple, faAmazon,faAndroid } from '@fortawesome/free-brands-svg-icons';
import { LayoutService } from './layout.service';
import {MenubarModule} from 'primeng/menubar';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HcsSharedDataService } from './hcs-shared-data.service';

@NgModule({
  declarations: [
    TopbarComponent,
    HcsSidebarComponent
  ],
  imports: [
    CommonModule,
    MenuModule,
    PanelMenuModule,
    FontAwesomeModule,
    MenubarModule,
    HttpClientModule
  ],
  exports: [
    TopbarComponent,
    HcsSidebarComponent
  ], 
  providers: [
    LayoutService,
    HcsSharedDataService
],
})
export class LayoutModule { 
  constructor() {
    library.add(faHouse, faSearch, faLifeRing, faUser, faSignOut, faTable, faUserPlus, faApple, faAmazon, faBars, faAndroid, faPencil, faAngleDoubleLeft, faMobile, faAngleLeft );
  
  }
}
