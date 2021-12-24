import { Student } from './../models/Student.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataDAOService {
  public urlStudent = "http://localhost:8080/api/student";
  public studentList: any;
  constructor(public http: HttpClient) { }
   async getAllStudent(){
    await this.http.get(this.urlStudent).toPromise().then(async data => {
      this.studentList = data

    })
      return this.studentList.data
  }
}
