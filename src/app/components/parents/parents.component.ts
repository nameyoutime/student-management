import { DataBUSService } from './../../services/data-bus.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Parent } from 'src/app/models/Parent.model';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {

  public parentsList: Parent[] = [];
  p: any = 1;
  public selectedParents: Parent = new Parent();
  addParentForm = new FormGroup({
    DadName: new FormControl('', [Validators.required]),
    MomName: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),

  })
  updateParentForm = new FormGroup({
    DadName: new FormControl('', [Validators.required]),
    MomName: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),

  })
  modalRef: any;
  constructor(private modalService: BsModalService, public data: DataBUSService) {
    this.modalRef = BsModalRef
    this.getAllParents();
  }

  ngOnInit(): void {
  }

  getAllParents() {
    this.data.getAllParent().then(data => {
      this.parentsList = data;
    })
  }
  addNewParents() {
    let form = this.addParentForm.controls;

    if (this.addParentForm.valid) {
      let newParents = new Parent(
        null, form.DadName.value,form.MomName.value, form.Address.value,
      )
      this.data.createParents(newParents).then(() => {
        alert("Thêm phụ huynh thành công");
        this.getAllParents();
      });
    } else {
      alert("Vui lòng nhập đủ thông tin")
    }
  }
  updateParents() {
    let form = this.updateParentForm.controls;
    if (this.updateParentForm.valid) {
      let newParents = new Parent(
        this.selectedParents._id, form.DadName.value,form.MomName.value, form.Address.value,
      )
      this.data.updateParents(newParents).then(() => {
        alert("Cập nhật phụ  huynh thành công");
        this.getAllParents();
      });
    } else {
      alert("Vui lòng nhập đủ thông tin")
    }
  }
  async deleteParents(Id: any) {
    await this.data.deteleParents(Id).then(() => {
      alert("Xóa thành công");
      this.getAllParents();
    })
  }
  getParentsDetail(Id: any) {
    this.data.getParentsDetail(Id).then(data => {
      this.selectedParents = data;

    })

  }
  searchParents() {
    let keyword = (<HTMLInputElement>document.getElementById("searchKeyword")).value
    if (keyword.trim()) {
      this.data.searchParents(keyword.trim()).then(data => {
        this.parentsList = data
      })
    } else {
      this.getAllParents();
    }
  }
  sort(field:any,sort:any){
    this.data.sortParent(field,sort).then(data=>{
      this.parentsList=data
    })

  }
  //Support Function
  async fillUpdateParentsForm(Id: any) {
    this.getParentsDetail(Id);
    setTimeout(() => {
      console.log(this.selectedParents)
      this.updateParentForm.setValue({
        DadName: this.selectedParents.DadName,
        MomName: this.selectedParents.MomName,
        Address: this.selectedParents.Address,
      })

    }, 250)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  //End Support Function

}
