import { DataBUSService } from './../../services/data-bus.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Parent } from 'src/app/models/Parent.model';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {

  public parentsList: Parent[] = [];
  public loadParents: boolean = false;
  public loadSelectedParents: boolean = false;

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
  constructor(private modalService: BsModalService, public data: DataBUSService,private shared:ShareService) {
    this.modalRef = BsModalRef
    
  }

  ngOnInit(): void {
    this.getAllParents();
  }

  getAllParents() {
    this.loadParents = false;

    this.data.getAllParent().then(data => {
      this.parentsList = data;
      this.loadParents = true;
    })
  }
  addNewParents() {
    let form = this.addParentForm.controls;

    if (this.addParentForm.valid) {
      let newParents = new Parent(
        null, form.DadName.value, form.MomName.value, form.Address.value,
      )
      this.data.createParents(newParents).then(() => {
        this.shared.showToast("Success","Thêm phụ huynh thành công");

        this.getAllParents();
      });
    } else {
      this.shared.showToast("Error","Vui lòng nhập đủ thông tin",true);

    }
  }
  updateParents() {
    let form = this.updateParentForm.controls;
    if (this.updateParentForm.valid) {
      let newParents = new Parent(
        this.selectedParents._id, form.DadName.value, form.MomName.value, form.Address.value,
      )
      this.data.updateParents(newParents).then(() => {
        this.shared.showToast("Success","Cập nhật phụ  huynh thành công");

        this.getAllParents();
      });
    } else {
      this.shared.showToast("Error","Vui lòng nhập đủ thông tin",true);

    }
  }
  async deleteParents(Id: any) {
    await this.data.deteleParents(Id).then(() => {
      this.shared.showToast("Success","Xóa thành công");

      this.getAllParents();
    })
  }
  getParentsDetail(Id: any) {
    this.loadSelectedParents = false;

    this.data.getParentsDetail(Id).then(data => {
      this.selectedParents = data;
      this.timeout();

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
  sort(field: any, sort: any) {
    this.data.sortParent(field, sort).then(data => {
      this.parentsList = data
    })

  }
  //Support Function
  async fillUpdateParentsForm(Id: any) {
    this.getParentsDetail(Id);

  }
  timeout() {
    this.updateParentForm.setValue({
      DadName: this.selectedParents.DadName,
      MomName: this.selectedParents.MomName,
      Address: this.selectedParents.Address,
    })
    this.loadSelectedParents = true;

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }
  //End Support Function

}
