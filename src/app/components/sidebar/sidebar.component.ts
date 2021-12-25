import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public isMenuCollapsed = this.shareSer.isSideBarCollapsed;
  public user: any = this.authSer.user;
  constructor(public shareSer: ShareService, public authSer: AuthService) { }

  ngOnInit() {

  }

  logout(){
    this.authSer.logout();
  }
}
