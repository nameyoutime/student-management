import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataBUSService {
  public URL = "http://localhost:8080/api/";
  public studentList: any;
  public student:any
  constructor(public http: HttpClient) { }

  /////Student
   async getAllStudent(){
    await this.http.get(this.URL+"student/").toPromise().then(async data => {
      this.studentList = data
    })
      return this.studentList.data
  }
  async getStudentDetail(Id:any){
    await this.http.get(this.URL+`student/${Id}`).toPromise().then(data=>{
      this.student=data;
    })
    return this.student.data;
  }

    /////End Student
}
