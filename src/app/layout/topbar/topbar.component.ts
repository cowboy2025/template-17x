import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { LayoutService } from 'src/app/layout/layout.service';
import { HCSUtils } from 'src/app/commons/hcs-util';
import {
  CommerceHostEnv,
  SessionType,
  URLTypes,
} from 'src/app/commons/hsc-constants';
import { HcsSharedDataService } from '../hcs-shared-data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  home!: MenuItem;
  myContent!: MenuItem[];
  help!: MenuItem[];
  search!: MenuItem;
  logout!: MenuItem;

  menuIds = ['mycontent'];
  expand!: boolean;
  mobileView = false;
  environment!: string;
  appTiltle: string = 'HCS Prime NG Template';
  // hcsHomeClick: any = HCSUtils.homeUrl();

  constructor(
    private hcsSharedDataService: HcsSharedDataService,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.environment = HCSUtils.environment;
    this.loadHCSTopMenuItems();
    this.mobileView = window.innerWidth < 768 ? true : false;
    this.hcsSharedDataService.collapse.subscribe((val) => {
      //console.log(val);
      this.expand = val;
    });
  }

  showMenu(menu: any) {
    this.resetMenu(menu);
    setTimeout(() => {
      let menus = document.getElementById(menu) as HTMLElement;
      // console.log(menus.style.display);
      if (menus.style.display == 'block') {
        menus.style.display = 'none';
      } else {
        menus.style.display = 'block';
      }
    });
  }

  logoutHCS() {
    HCSUtils.clearStorage(SessionType.BOTH);
    if (HCSUtils.isLocalHost()) {
      HCSUtils.getWindowObj().location =
        'https:/' + CommerceHostEnv.DEV + this.logout.url;
    } else {
      HCSUtils.getWindowObj().location = this.logout.url;
    }
  }

  onHelp() {
    HCSUtils.getWindowObj().location = HCSUtils.getHCSHelpUrl();
  }

  searchHCS() {
    if (HCSUtils.isLocalHost()) {
      HCSUtils.getWindowObj().location =
        'https:/' + CommerceHostEnv.DEV + this.search.url;
    } else {
      HCSUtils.getWindowObj().location = this.search.url;
    }
  }

  homeHCS() {
    let env = this.getEnv();
    let target;
    if (env == 'uat') {
      target = CommerceHostEnv.UAT;
    } else if (env == 'prod') {
      target = CommerceHostEnv.PROD;
    } else if (env == 'dev') {
      target = CommerceHostEnv.DEV;
    } else {
      target = CommerceHostEnv.DEV;
    }

    document.location.href = `https://${target}/hcs/index.html`;
  }

  getEnv(): any {
    let env = ' ';

    // change the index as per the application name
    if (_browserWindow().location.hostname.indexOf('uatcommerce') !== -1) {
      env = 'uat';
    } else if (
      _browserWindow().location.hostname.indexOf('devcommerce') !== -1
    ) {
      env = 'dev';
    } else if (_browserWindow().location.hostname.indexOf('commerce') !== -1) {
      env = 'prod';
    } else {
      env = 'localhost';
    }
    return env;
  }

  resetMenu(menu: any) {
    this.menuIds.map((id) => {
      if (id != menu) {
        let list = document.getElementById(id) as HTMLElement;
        list.style.display = 'none';
      }
    });
  }

  toggle() {
    //  console.log('ppp',this.expand)
    this.resetMenu('menu4');
    this.hcsSharedDataService.collapse.next(!this.expand);
    let closeMenuStyleId = document.getElementById(
      'closeMenuStyle'
    ) as HTMLElement;
    if (closeMenuStyleId.style.display == 'none') {
      closeMenuStyleId.style.display = 'block';
    }
  }

  private loadHCSTopMenuItems() {
    this.hcsSharedDataService.currentdohTopMenu.subscribe((dohTopMenu) => {
      if (dohTopMenu != null) {
        //console.log("if")
        this.buildTopMenu(dohTopMenu);
      } else {
        //   console.log("else")
        this.layoutService.getHCSTopMenuItems().subscribe(
          (res: any) => {
            if (res != null) {
              this.hcsSharedDataService.storeTopMenu(res);
              this.buildTopMenu(res);
            } else {
            }
          },
          (error: any) => {
            console.log(error.error);
          }
        );
      }
    });
  }

  private buildTopMenu(res: any) {
    for (let index = 0; index < res.length; index++) {
      const element = res[index];
      // Home
      if (element.id == '1.0') {
        this.home = element;
        this.updateMenuElements(this.home, element);
      }
      // My Contents
      if (element.id == '2.0') {
        this.myContent = element.items;
        for (let i = 0; i < element.items.length; i++) {
          const menuElm = element.items[i];
          this.updateMenuElements(this.myContent[i], menuElm);
        }
      }
      // Search
      if (element.id == '3.0') {
        this.search = element;
        this.updateMenuElements(this.search, element);
      }

      //logout
      if (element.id == '5.0') {
        this.logout = element;
        this.updateMenuElements(this.logout, element);
      }
    }
  }

  private updateMenuElements(refArrayObj: any, menuElm: any) {
    if (menuElm.urlType == URLTypes.RELATIVE) {
      let targetURL = '';
      refArrayObj.command = (event: any) => {
        if (this.environment === 'DEV' || this.environment === 'LOCAL') {
          targetURL = CommerceHostEnv.DEV;
        } else if (this.environment === 'EVAL') {
          targetURL = CommerceHostEnv.EVAL;
        } else if (this.environment === 'UAT') {
          targetURL = CommerceHostEnv.UAT;
        } else if (this.environment === 'PROD' || this.environment === '') {
          targetURL = CommerceHostEnv.PROD;
        }
        refArrayObj.url = 'https://' + targetURL + menuElm.url;
      };
    } else if (menuElm.urlType == URLTypes.PRINT_FUNC) {
      refArrayObj.url = '';
      refArrayObj.command = (event: any) => {
        HCSUtils.getWinPrint();
      };
    }
  }
}

function _browserWindow(): any {
  // return the global native browser window object
  return window;
}
