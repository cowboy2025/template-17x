import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { HcsSharedDataService } from '../hcs-shared-data.service';
import { NavigationEnd, Router } from '@angular/router';

// import { faAndroid } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-hcs-sidebar',
  templateUrl: './hcs-sidebar.component.html',
  styleUrls: ['./hcs-sidebar.component.scss'],
})
export class HcsSidebarComponent implements OnInit {
  expanded: boolean = true;
  mobileView = false;
  menus!: MenuItem[];
  isExpandMobileMenu: boolean = false;
  targetUrl: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobileView = window.innerWidth < 768 ? true : false;
    this.updateMenus();
  }

  constructor(private service: HcsSharedDataService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.pushContents();
      }
    });
  }

  updateMenus() {
    this.menus = [
      {
        label: this.expanded ? 'Menu 1' : '',
        expanded: false,
        icon: 'fal fa-home',
        items: [
          {
            label: this.expanded ? 'Sub Menu 1' : '',
            icon: 'fab fa-amazon',
            target: '_self',
            title: 'Home',
            routerLink: ['/home'],
          },
          {
            label: this.expanded ? 'Sub Menu 2' : '',
            icon: 'fab fa-google',
          },
        ],
      },
      {
        label: this.expanded ? 'Menu 2' : '',
        icon: 'fal fa-user-plus',
        items: [
          {
            label: this.expanded ? 'Sub Menu 1' : '',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: this.expanded ? 'Sub2 Menu 1' : '',
                icon: 'pi pi-fw pi-user-plus',
              },
              {
                label: this.expanded ? 'Sub2 Menu 2' : '',
                icon: 'pi pi-fw pi-filter',
              },
            ],
          },
          {
            label: this.expanded ? 'Sub2 Menu 2' : '',
            icon: 'pi pi-fw pi-external-link',
          },
          { separator: true },
          {
            label: this.expanded ? 'Sub2 Menu 3' : '',
            icon: 'pi pi-fw pi-times',
          },
        ],
      },
      {
        label: this.expanded ? 'Menu 3' : '',
        icon: 'far fa-lock-alt',
        target: '_self',
        title: 'Menu 3',
        routerLink: ['/secure'],
      },
      {
        label: this.expanded ? 'Menu 4' : '',
        icon: 'fab fa-apple',
      },
      {
        label: this.expanded ? 'Menu 5' : '',
        icon: 'fal fa-table',
      },
    ];
    if (!this.targetUrl) {
      this.targetUrl = '/home';
    }
    this.setExpandState(this.menus, this.targetUrl);
  }

  ngOnInit() {
    this.mobileView = window.innerWidth < 768 ? true : false;
    this.updateMenus();
    this.updateMenuView();
  }

  updateMenuView() {
    this.expanded = !this.expanded;
    this.toggleSidebar();
  }

  toggleSidebar() {
    let sidebar = document.getElementById('sidebar') as HTMLElement;
    let main = document.getElementById('main') as HTMLElement;

    setTimeout(() => {
      switch (this.mobileView) {
        case true:
          this.setMobileView(sidebar);
          break;
        case false:
          this.setDesktopView(sidebar, main);
          break;
      }
    });
  }
  setMobileView(sidebar: HTMLElement) {
    if (!this.expanded) {
      sidebar.style.bottom = '-20em';
    } else {
      sidebar.style.bottom = '4em';
    }
  }

  setDesktopView(sidebar: HTMLElement, main: HTMLElement) {
    if (sidebar === null) {
      this.updateMenuView();
    } else {
      if (this.expanded) {
        sidebar.style.width = '15em';
        if (main) {
          main.style.marginLeft = '15em';
        }
      } else {
        sidebar.style.width = '7em';
        if (main) {
          main.style.marginLeft = '7em';
        }
      }
      this.setExpandState(this.menus, this.targetUrl);
      setTimeout(() => {
        this.updateMenus();
      }, 100);
    }
  }

  linkSelected() {
    this.service.collapse.next(!this.expanded);
  }

  pushContents() {
    setTimeout(() => {
      let main = document.getElementById('main') as HTMLElement;
      // console.log(" content");
      if (this.expanded) {
        main.style.marginLeft = '15em';
      }
      if (this.mobileView) {
        this.linkSelected();
      }

      let closeMenuStyleId = document.getElementById(
        'closeMenuStyle'
      ) as HTMLElement;

      if (closeMenuStyleId.style.display == 'block') {
        closeMenuStyleId.style.display = 'none';
      } else if (closeMenuStyleId.style.display == '') {
        closeMenuStyleId.style.display = 'none';
      } else {
        closeMenuStyleId.style.display = 'block';
      }
    });
  }

  setExpandState(menu: any, targetURL: string, parent?: any) {
    menu.forEach((eachItem: any) => {
      if (eachItem && eachItem.hasOwnProperty('items')) {
        this.setExpandState(eachItem.items, targetURL, eachItem);
      } else {
        if (eachItem.routerLink == targetURL) {
          if (parent) {
            parent.expanded = true;
          } else {
            eachItem.expand = true;
          }
        }
      }
    });
  }

  updateMenuStatus(target: any, source: any) {
    (source || []).forEach((menuItem: any, index: any) => {
      try {
        if (
          menuItem &&
          menuItem.hasOwnProperty('expanded') &&
          menuItem?.expanded
        ) {
          target[index]['expanded'] = true;
        } else {
          target[index]['expanded'] = false;
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  mobileMenuToggle() {
    this.isExpandMobileMenu = !this.isExpandMobileMenu;
  }
}
