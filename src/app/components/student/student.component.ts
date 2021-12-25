import { DataBUSService } from './../../services/data-bus.service';
import { Observable } from 'rxjs';
import { Student } from './../../models/Student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Teacher } from 'src/app/models/Teacher.model';
import { Parent } from 'src/app/models/Parent.model';
import { Class } from 'src/app/models/Class.model';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']

})
export class StudentComponent implements OnInit {
  public students: Student[] = [];
  public teachers: Teacher[] = [];
  public parents: Parent[] = [];
  public classes: Class[] = [];
  public selectedStudent: Student = new Student();
  addStudentForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Age: new FormControl('', [Validators.required]),
    Yob: new FormControl('', [Validators.required]),
    Parents: new FormControl('', []),
    Teacher: new FormControl('', []),
    Class: new FormControl('', []),
  })
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
  addNewStudent() {
    let form = this.addStudentForm.controls;
    let year = form.Yob.value?.year;
    if (this.addStudentForm.valid) {
      let newStudent = new Student(
        null, form.Name.value, form.Age.value, year, form.Parents.value, form.Teacher.value, form.Class.value
      )
      this.data.createStudent(newStudent).then(() => {
        alert("Thêm học sinh thành công");
        this.getAllStudent();
      });

    } else {
      alert("Vui lòng nhập đủ thông tin")
    }


  }
  getAllTeacher() {
    this.data.getAllTeacher().then(data => {
      this.teachers = data;
    })
  }
  getAllParent() {
    this.data.getAllParent().then(data => {
      this.parents = data;
    })
  }
  getAllClass() {
    this.data.getAllClass().then(data => {
      this.classes = data;
    })
  }
  getStudentDetail(Id: any) {
    this.data.getStudentDetail(Id).then(data => {
      this.selectedStudent = data;
    })

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

}
