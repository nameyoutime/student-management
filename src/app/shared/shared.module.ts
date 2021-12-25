

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from '../components/student/student.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ModalModule, BsModalService, } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownMenu } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { TeacherComponent } from '../components/teacher/teacher.component';
import { ClassComponent } from '../components/class/class.component';
import { ParentsComponent } from '../components/parents/parents.component';
import { SubjectComponent } from '../components/subject/subject.component';
@NgModule({
  declarations: [StudentComponent, SidebarComponent, NavbarComponent,TeacherComponent,ClassComponent,ParentsComponent,SubjectComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModule,
    NgxPaginationModule


  ],
  exports: [StudentComponent, ModalModule, FormsModule, ReactiveFormsModule, NgbDatepickerModule, SidebarComponent, CommonModule, NavbarComponent,
    NgbDropdownMenu, NgxPaginationModule,TeacherComponent,ClassComponent,ParentsComponent,SubjectComponent],
  providers: [BsModalService]
})
export class SharedModule { }
