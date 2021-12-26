import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShareService } from 'src/app/services/share.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isMenuCollapsed1 = this.shareSer.isSideBarCollapsed;
  public isMenuCollapsed = this.shareSer.isNavBarCollapsed;
  public user: any = this.authSer.user;
  constructor(public shareSer:ShareService, public authSer: AuthService) {

  }
  ngOnInit(): void {
    
  }
  logout(){
    this.authSer.logout();
  }
}
