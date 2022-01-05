import { DataBUSService } from './../../services/data-bus.service';
import { Observable } from 'rxjs';
import { Student } from './../../models/Student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Teacher } from 'src/app/models/Teacher.model';
import { Parent } from 'src/app/models/Parent.model';
import { Class } from 'src/app/models/Class.model';
import { ShareService } from 'src/app/services/share.service';
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
  public loadClasses: boolean = false;
  public loadParents: boolean = false;
  public loadTeachers: boolean = false;
  public loadStudent: boolean = false;
  public loadselectedStudent: boolean = false;
  p: any = 1;
  public selectedStudent: Student = new Student();
  addStudentForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Age: new FormControl('', [Validators.required]),
    Yob: new FormControl('', [Validators.required]),
    Parents: new FormControl('', [Validators.required]),
    Teacher: new FormControl('', [Validators.required]),
    Class: new FormControl('', [Validators.required]),
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
  constructor(private modalService: BsModalService, public data: DataBUSService,private shared:ShareService) {
    this.modalRef = BsModalRef
    this.getAllStudent();
  }

  ngOnInit(): void {
  }

  getAllStudent() {
    this.loadStudent = false;
    this.data.getAllStudent().then(data => {
      this.students = data;
      this.loadStudent = true;
    })
  }
  addNewStudent() {
    let form = this.addStudentForm.controls;

    // let dob = `${form.Yob.value?.year}-${form.Yob.value?.month}-${form.Yob.value?.day}`;
    if (this.addStudentForm.valid) {
      let newStudent = new Student(
        null, form.Name.value, form.Age.value, form.Yob.value, form.Parents.value, form.Teacher.value, form.Class.value
      )
      this.data.createStudent(newStudent).then(() => {
        this.shared.showToast("Success","Thêm học sinh thành công");


      }).finally(() => {
        this.getAllStudent();
      });
    } else {
      this.shared.showToast("Error","Vui lòng nhập đủ thông tin",true);

    }
  }
  updateStudent() {
    let form = this.updateStudentForm.controls;
    // let dob = `${form.Yob.value?.year}-${form.Yob.value?.month}-${form.Yob.value?.day}`;

    if (this.updateStudentForm.valid) {
      let newStudent = new Student(
        this.selectedStudent._id, form.Name.value, form.Age.value, form.Yob.value, form.Parents.value, form.Teacher.value, form.Class.value
      )
      this.data.updateStudent(newStudent).then(() => {
        this.shared.showToast("Success","Cập nhật học sinh thành công");


      }).finally(() => {
        this.getAllStudent();
      });
    } else {
      this.shared.showToast("Error","Vui lòng nhập đủ thông tin",true);

    }
  }
  async deleteStudent(Id: any) {
    await this.data.deteleStudent(Id).then(() => {
      this.shared.showToast("Success","Xóa thành công");


    }).finally(() => {
      this.getAllStudent();
    })
  }
  getStudentDetail(Id: any) {
    this.loadselectedStudent =false;
    this.data.getStudentDetail(Id).then(data => {
      this.selectedStudent = data;
      
      this.timeout();
    })

  }
  searchStudent() {
    let keyword = (<HTMLInputElement>document.getElementById("searchKeyword")).value
    if (keyword.trim()) {
      this.data.searchStudent(keyword.trim()).then(data => {
        this.students = data
      })
    } else {
      this.getAllStudent();
    }


  }
  sort(field: any, sort: any) {
    this.data.sortStudent(field, sort).then(data => {
      this.students = data
    })

  }
  //Support Function
  async fillUpdateStudentForm(Id: any) {
    this.getStudentDetail(Id);
    this.getAllTeacher();
    this.getAllParent();
    this.getAllClass()
  }

  timeout() {
    if (this.selectedStudent.Parents.length == 0) {
      this.selectedStudent.Parents.push({ _id: "" })
    } if (this.selectedStudent.Teacher.length == 0) {
      this.selectedStudent.Teacher.push({ _id: "" })
    } if (this.selectedStudent.Class.length == 0) {
      this.selectedStudent.Class.push({ _id: "" })
    }
    this.updateStudentForm.setValue({
      Name: this.selectedStudent.Name,
      Age: this.selectedStudent.Age,
      Yob: this.selectedStudent.Yob,
      Parents: this.selectedStudent.Parents[0]._id,
      Teacher: this.selectedStudent.Teacher[0]._id,
      Class: this.selectedStudent.Class[0]._id,
    })
    this.loadselectedStudent= true;
  }

  getAllTeacher() {
    this.loadTeachers = false;

    this.data.getAllTeacher().then(data => {
      this.teachers = data;
      this.loadTeachers = true;
    })
    

  }
  getAllParent() {
        
    this.loadParents = false;

    this.data.getAllParent().then(data => {
      this.parents = data;
      this.loadParents = true;
    })
    

  }
  getAllClass() {
    
    this.loadClasses = false;


    this.data.getAllClass().then(data => {
      this.classes = data;
      this.loadClasses = true;
    })
    
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });

    this.classes = [];
    this.parents = [];
    this.teachers = [];

  }
  //End Support Function

}
