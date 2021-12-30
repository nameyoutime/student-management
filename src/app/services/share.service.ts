import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public isSideBarCollapsed: boolean = false;
  public isNavBarCollapsed: boolean = true;

  public collapSidebar() {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
  }
  constructor() {
  this.isSideBarCollapsed = false;

  }
}
