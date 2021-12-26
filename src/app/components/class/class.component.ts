import { DataBUSService } from './../../services/data-bus.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Class } from 'src/app/models/Class.model';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  public classes: Class[] = [];
  p: any = 1;
  public selectedClass: Class = new Class();
  addClassForm = new FormGroup({

    Description: new FormControl('', [Validators.required]),
  })
  updateClassForm = new FormGroup({

    Description: new FormControl('', [Validators.required]),

  })
  modalRef: any;
  constructor(private modalService: BsModalService, public data: DataBUSService) {
    this.modalRef = BsModalRef
    this.getAllClass();
  }

  ngOnInit(): void {
  }

  getAllClass() {
    this.data.getAllClass().then(data => {
      this.classes = data;
    })
  }
  addNewClass() {
    let form = this.addClassForm.controls;

    if (this.addClassForm.valid) {
      let newClass = new Class(
        null, null, form.Description.value,
      )
      this.data.createClass(newClass).then(() => {
        alert("Thêm lớp học thành công");
        this.getAllClass();
      });
    } else {
      alert("Vui lòng nhập đủ thông tin")
    }
  }
  updateClass() {
    let form = this.updateClassForm.controls;
    if (this.updateClassForm.valid) {
      let newClass = new Class(
        this.selectedClass._id,null, form.Description.value
      )
      this.data.updateClass(newClass).then(() => {
        alert("Cập nhật lớp học thành công");
        this.getAllClass();
      });
    } else {
      alert("Vui lòng nhập đủ thông tin")
    }
  }
  async deleteClass(Id: any) {
    await this.data.deteleClass(Id).then(() => {
      alert("Xóa thành công");
      this.getAllClass();
    })
  }
  getClassDetail(Id: any) {
    this.data.getClassDetail(Id).then(data => {
      this.selectedClass = data;

    }).finally(()=>{
      this.timeout();
    })

  }
  searchClass() {
    let keyword = (<HTMLInputElement>document.getElementById("searchKeyword")).value
    if (keyword.trim()) {
      this.data.searchClass(keyword.trim()).then(data => {

        this.classes = data
      })
    } else {
      this.getAllClass();
    }
  }
  //Support Function
  async fillUpdateClassForm(Id: any) {
    this.getClassDetail(Id);
  }
  timeout(){
    this.updateClassForm.setValue({

      Description: this.selectedClass.Description,

    })
  }
  sort(field:any,sort:any){
    this.data.sortClass(field,sort).then(data=>{
      this.classes=data
    })

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  //End Support Function

}
