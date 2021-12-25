import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public isSideBarCollapsed: boolean = true;
  public isNavBarCollapsed: boolean = true;


  public collapSidebar() {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
    console.log(this.isSideBarCollapsed)
  }
  constructor() { }
}
