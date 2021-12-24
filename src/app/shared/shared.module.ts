
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from '../components/student/student.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ModalModule, BsModalService, } from 'ngx-bootstrap/modal';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

@NgModule({
  declarations: [StudentComponent,SidebarComponent,NavbarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,

  ],
  exports:[StudentComponent,ModalModule,FormsModule,ReactiveFormsModule,NgbDatepickerModule,SidebarComponent,CommonModule,NavbarComponent],
  providers:[BsModalService]
})
export class SharedModule { }
