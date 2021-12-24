import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isMenuCollapsed1 = this.shareSer.isSideBarCollapsed;
  public isMenuCollapsed = this.shareSer.isNavBarCollapsed;

  constructor(public shareSer:ShareService) {

  }
  ngOnInit(): void {
    
  }
}
