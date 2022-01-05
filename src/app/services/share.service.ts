import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public isSideBarCollapsed: boolean = false;
  public isNavBarCollapsed: boolean = true;
  constructor(private toastr: ToastrService) {
    this.isSideBarCollapsed = false;

  }
  public collapSidebar() {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
  }
  showToast(title: string, message: string, error: boolean = false) {
    if (error) {
      this.toastr.error(title, message, {
        timeOut: 1000,
      });
    } else {
      this.toastr.success(title, message, {
        timeOut: 1000,
      });
    }


  }
}
