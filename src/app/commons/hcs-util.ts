import { CommerceHostEnv, helpUrl, SessionType } from './hsc-constants';

export class HCSUtils {
  static clearStorage(_type: string) {
    if (SessionType.BOTH == _type) {
      sessionStorage.clear();
      localStorage.clear();
    } else if (SessionType.LOCAL == _type) localStorage.clear();
    else if (SessionType.SESSION == _type) sessionStorage.clear();
  }

  static getHostUrl(): string {
    return (
      _browserWindow().location.protocol +
      '//' +
      _browserWindow().location.hostname
    );
  }

  static getWinPrint(): any {
    return _browserWindow().print();
  }

  static getWindowObj(): any {
    return _browserWindow();
  }

  static get environment(): string {
    if (this.hostName.indexOf(CommerceHostEnv.DEV) != -1) {
      return 'DEV';
    } else if (this.hostName.indexOf(CommerceHostEnv.EVAL) != -1) {
      return 'EVAL';
    } else if (this.hostName.indexOf(CommerceHostEnv.UAT) != -1) {
      return 'UAT';
    } else if (this.hostName.indexOf(CommerceHostEnv.PROD) != -1) {
      return 'PROD';
    } else return 'LOCAL';
  }

  static getHCSHelpUrl(): any {
    if (this.environment === 'DEV' || this.environment === 'LOCAL') {
      return helpUrl.DEV;
    } else if (this.environment === '(EVAL)') {
      return helpUrl.EVAL;
    } else if (this.environment === '(UAT)') {
      return helpUrl.UAT;
    } else if (this.environment === 'PROD' || this.environment === '') {
      return helpUrl.PROD;
    }
  }

  static get baseUrl(): string {
    let url = '';
    const PROXY_URL = '/api';
    const REST_URL = '/hpn/ctrldocs/webserv/hcs/primeng/template/v13x';
    if (this.hostName.indexOf(CommerceHostEnv.GENERIC) != -1) {
      url = REST_URL;
    } else {
      url = PROXY_URL + REST_URL;
    }
    return url;
  }

  static get hostName(): string {
    return _browserWindow().location.hostname;
  }

  static get location(): string {
    return _browserWindow().location.toString();
  }

  static isLocalHost(): boolean {
    if (this.hostName.indexOf(CommerceHostEnv.GENERIC) == -1) {
      return true;
    } else {
      return false;
    }
  }

  static get enviromentTopBar(): string {
    if (this.hostName.indexOf('uatcommerce.health.ny.gov') != -1) {
      return 'UAT';
    } else if (this.hostName.indexOf('commerce.health.ny.gov') != -1) {
      return 'PROD';
    } else if (
      this.hostName.indexOf('devdock2') != -1 ||
      this.hostName.indexOf('localhost') != -1
    ) {
      return 'DEV';
    } else {
      return 'Local';
    }
  }
}

function _browserWindow(): any {
  // return the global native browser window object
  return window;
}
