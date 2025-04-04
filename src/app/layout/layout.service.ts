import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HCSUtils } from '../commons/hcs-util';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private httpClient: HttpClient) {}


  public getHCSTopMenuItems(): any {
    let uri = "/assets/static-data/hcs-top-menu.json";
    if (!HCSUtils.isLocalHost()) {
        uri = HCSUtils.baseUrl + uri;
    }
    return this.httpClient.get(uri);
}

public getUserProfile(): any {
  let uri = "/assets/users.json";
  /*
  if (!MeritsUtil.isLocalHost()) {
      uri = MeritsUtil.baseUrl + "user";
  }*/
  return this.httpClient.get(uri);
}
}
