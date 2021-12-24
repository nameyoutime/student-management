import { Component, OnInit,TemplateRef} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  addStudentForm=new FormGroup({})
  modalRef:any;
  constructor(private modalService: BsModalService) {
    this.modalRef=BsModalRef
   }

  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

}
