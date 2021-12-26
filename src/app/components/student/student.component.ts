import { DataBUSService } from './../../services/data-bus.service';
import { Observable } from 'rxjs';
import { Student } from './../../models/Student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Teacher } from 'src/app/models/Teacher.model';
import { Parent } from 'src/app/models/Parent.model';
import { Class } from 'src/app/models/Class.model';
import { } from '../../shared/shared.module'
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
  p: any = 1;
  public selectedStudent: Student = new Student();
  addStudentForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Age: new FormControl('', [Validators.required]),
    Yob: new FormControl('', [Validators.required]),
    Parents: new FormControl('', []),
    Teacher: new FormControl('', []),
    Class: new FormControl('', []),
  })
  updateStudentForm = new FormGroup({
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

    let dob = `${form.Yob.value?.year}-${form.Yob.value?.month}-${form.Yob.value?.day}`;
    if (this.addStudentForm.valid) {
      let newStudent = new Student(
        null, form.Name.value, form.Age.value, dob, form.Parents.value, form.Teacher.value, form.Class.value
      )
      this.data.createStudent(newStudent).then(() => {
        alert("Thêm học sinh thành công");
        this.getAllStudent();
      });
    } else {
      alert("Vui lòng nhập đủ thông tin")
    }
  }
  updateStudent() {
    let form = this.updateStudentForm.controls;
    let dob = `${form.Yob.value?.year}-${form.Yob.value?.month}-${form.Yob.value?.day}`;

    if (this.updateStudentForm.valid) {
      let newStudent = new Student(
        this.selectedStudent._id, form.Name.value, form.Age.value, dob, form.Parents.value, form.Teacher.value, form.Class.value
      )
      this.data.updateStudent(newStudent).then(() => {
        alert("Cập nhật học sinh thành công");
        this.getAllStudent();
      });
    } else {
      alert("Vui lòng nhập đủ thông tin")
    }
  }
  async deleteStudent(Id: any) {
    await this.data.deteleStudent(Id).then(() => {
      alert("Xóa thành công");
      this.getAllStudent();
    })
  }
  getStudentDetail(Id: any) {
    this.data.getStudentDetail(Id).then(data => {
      this.selectedStudent = data;
    })

  }
  searchStudent() {
    let keyword = (<HTMLInputElement>document.getElementById("searchKeyword")).value
    if (keyword.trim()) {
      this.data.searchStudent(keyword.trim()).then(data => {
        console.log(data);
        this.students = data
      })
    } else {
      this.getAllStudent();
    }


  }
  sort(field:any,sort:any){
    this.data.sortStudent(field,sort).then(data=>{
      this.students=data
    })

  }
  //Support Function
  async fillUpdateStudentForm(Id: any) {
    this.getStudentDetail(Id);
    this.getAllTeacher();
    this.getAllParent();
    this.getAllClass();

    setTimeout(() => {
      this.updateStudentForm.setValue({
        Name: this.selectedStudent.Name,
        Age: this.selectedStudent.Age,
        Yob: this.selectedStudent.Yob,
        Parents: this.selectedStudent.Parents[0]._id,
        Teacher: this.selectedStudent.Teacher[0]._id,
        Class: this.selectedStudent.Class[0]._id,
      })

    }, 250)

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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  //End Support Function

}
