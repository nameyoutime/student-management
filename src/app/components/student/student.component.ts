import { DataBUSService } from './../../services/data-bus.service';
import { Observable } from 'rxjs';
import { Student } from './../../models/Student.model';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']

})
export class StudentComponent implements OnInit {
  public students: Student[] = [];
  public selectedStudent:Student=new Student();
    addStudentForm = new FormGroup({})
  modalRef: any;
  constructor(private modalService: BsModalService, public data: DataBUSService) {
    this.modalRef = BsModalRef
    this.getAllStudent();
  }

  ngOnInit(): void {
  }

  getAllStudent() {
    this.data.getAllStudent().then(data => {
      this.students = data;
    })
  }
  getStudentDetail(Id:any){
    this.data.getStudentDetail(Id).then(data=>{
      this.selectedStudent=data;
    })

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class:'modal-lg'});
  }

}
