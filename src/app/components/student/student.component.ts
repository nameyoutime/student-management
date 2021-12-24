import { Observable } from 'rxjs';
import { Student } from './../../models/Student.model';
import { DataDAOService } from './../../services/data-dao.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']

})
export class StudentComponent implements OnInit {
  public students: Student[]=[];
  addStudentForm = new FormGroup({})
  modalRef: any;
  constructor(private modalService: BsModalService, public data: DataDAOService) {
    this.modalRef = BsModalRef
    this.data.getAllStudent().then(data => {
       this.students = data;
    })
  }

  ngOnInit(): void {

  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
