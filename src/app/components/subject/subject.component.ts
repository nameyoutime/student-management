import { DataBUSService } from './../../services/data-bus.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'src/app/models/Subject.model';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  public subjects: Subject[] = [];
  public loadSubject:boolean = false;
  public loadSelectedSubject:boolean = false;

  p: any = 1;
  public selectedSubject: Subject = new Subject();
  addSubjectForm = new FormGroup({
    Title: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),

  })
  updateSubjectForm = new FormGroup({
    Title: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),

  })
  modalRef: any;
  constructor(private modalService: BsModalService, public data: DataBUSService) {
    this.modalRef = BsModalRef
    this.getAllSubject();
  }

  ngOnInit(): void {
  }

  getAllSubject() {
    this.loadSubject=false;
    this.data.getAllSubject().then(data => {
      this.subjects = data;
    this.loadSubject=true;

    })
  }
  addNewSubject() {
    let form = this.addSubjectForm.controls;

    if (this.addSubjectForm.valid) {
      let newSubject = new Subject(
        null, form.Title.value, form.Description.value,
      )
      this.data.createSubject(newSubject).then(() => {
        alert("Thêm môn học thành công");
        this.getAllSubject();
      });
    } else {
      alert("Vui lòng nhập đủ thông tin")
    }
  }
  updateSubject() {
    let form = this.updateSubjectForm.controls;
    if (this.updateSubjectForm.valid) {
      let newSubject = new Subject(
        this.selectedSubject._id, form.Title.value, form.Description.value
      )
      this.data.updateSubject(newSubject).then(() => {
        alert("Cập nhật môn học thành công");
        this.getAllSubject();
      });
    } else {
      alert("Vui lòng nhập đủ thông tin")
    }
  }
  async deleteSubject(Id: any) {
    await this.data.deteleSubject(Id).then(() => {
      alert("Xóa thành công");
      this.getAllSubject();
    })
  }
  getSubjectDetail(Id: any) {
    this.loadSelectedSubject = false;

    this.data.getSubjectDetail(Id).then(data => {
      this.selectedSubject = data;
      this.timeout();
    })

  }
  searchSubject() {
    let keyword = (<HTMLInputElement>document.getElementById("searchKeyword")).value
    if (keyword.trim()) {
      this.data.searchSubject(keyword.trim()).then(data => {

        this.subjects = data
      })
    } else {
      this.getAllSubject();
    }
  }
  sort(field:any,sort:any){
    this.data.sortSubject(field,sort).then(data=>{
      this.subjects=data
    })

  }
  //Support Function
  async fillUpdateSubjectForm(Id: any) {
    this.getSubjectDetail(Id);
  }
  timeout(){
    this.updateSubjectForm.setValue({
      Title: this.selectedSubject.Title,
      Description: this.selectedSubject.Description,

    })
    this.loadSelectedSubject = true;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    
  }
  //End Support Function

}
