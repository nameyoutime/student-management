import { DataBUSService } from './../../services/data-bus.service';
import { Observable } from 'rxjs';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Teacher } from 'src/app/models/Teacher.model';
import { Subject } from 'src/app/models/Subject.model';
import { Class } from 'src/app/models/Class.model';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  public teachers: Teacher[] = [];
  public subjects: Subject[] = [];
  public loadTeachers: boolean = false;
  public loadSubjects: boolean = false;
  public loadSelectedTeacher: boolean = false;


  p: any = 1;
  public selectedTeacher: Teacher = new Teacher();
  addTeacherForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Age: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),
    Subject: new FormControl('', []),
  })
  updateTeacherForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Age: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),
    Subject: new FormControl('', []),
  })
  modalRef: any;
  constructor(private modalService: BsModalService, public data: DataBUSService) {
    this.modalRef = BsModalRef
    this.getAllTeacher();
  }

  ngOnInit(): void {
  }

  getAllTeacher() {
    this.loadTeachers = false;
    this.data.getAllTeacher().then(data => {
      this.teachers = data;
      this.loadTeachers = true;
    })
  }
  addNewTeacher() {
    let form = this.addTeacherForm.controls;

    if (this.addTeacherForm.valid) {
      let newTeacher = new Teacher(
        null, form.Name.value, form.Age.value, form.Address.value, form.Subject.value
      )
      this.data.createTeacher(newTeacher).then(() => {
        alert("Thêm giáo viên thành công");
        this.getAllTeacher();
      });
    } else {
      alert("Vui lòng nhập đủ thông tin")
    }
  }
  updateTeacher() {
    let form = this.updateTeacherForm.controls;
    if (this.updateTeacherForm.valid) {
      let newTeacher = new Teacher(
        this.selectedTeacher._id, form.Name.value, form.Age.value, form.Address.value, form.Subject.value
      )
      this.data.updateTeacher(newTeacher).then(() => {
        alert("Cập nhật giáo viên thành công");
        this.getAllTeacher();
      });
    } else {
      alert("Vui lòng nhập đủ thông tin")
    }
  }
  async deleteTeacher(Id: any) {
    await this.data.deteleTeacher(Id).then(() => {
      alert("Xóa thành công");
      this.getAllTeacher();
    })
  }
  getTeacherDetail(Id: any) {
    this.loadSelectedTeacher = false;
    this.data.getTeacherDetail(Id).then(data => {
      this.selectedTeacher = data;
      this.timeout();
    })

  }
  searchTeacher() {
    let keyword = (<HTMLInputElement>document.getElementById("searchKeyword")).value
    if (keyword.trim()) {
      this.data.searchTeacher(keyword.trim()).then(data => {
        this.teachers = data
      })
    } else {
      this.getAllTeacher();
    }
  }
  sort(field: any, sort: any) {
    this.data.sortTeacher(field, sort).then(data => {
      this.teachers = data
    })

  }
  //Support Function
  async fillUpdateTeacherForm(Id: any) {
    this.getTeacherDetail(Id);

  }

  timeout() {
    if (this.selectedTeacher.Subject.length == 0) {
      this.selectedTeacher.Subject.push({ _id: "" })
    }
    this.updateTeacherForm.setValue({
      Name: this.selectedTeacher.Name,
      Age: this.selectedTeacher.Age,
      Address: this.selectedTeacher.Address,
      Subject: this.selectedTeacher.Subject[0]._id,
    })
    this.loadSelectedTeacher = true;
  }
  getAllSubject() {
    this.loadSubjects = false;
    this.data.getAllSubject().then(data => {
      this.subjects = data;
      this.loadSubjects = true;
    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.subjects = []
  }
  //End Support Function

}
