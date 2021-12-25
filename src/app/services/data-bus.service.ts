import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataBUSService {
  public URL = "http://localhost:8080/api/";
  public studentList: any;
  public student:any
  public teacherList:any;
  public teacher:any;
  public parentList:any;
  public parent:any;
  public classList:any;
  public class:any;
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

    ///Teacher

    async getAllTeacher(){
      await this.http.get(this.URL+"teacher/").toPromise().then(async data => {
        this.teacherList = data
      })
        return this.teacherList.data
    }
    ///EndTeacher


    ///Parent
    async getAllParent(){
      await this.http.get(this.URL+"parents/").toPromise().then(async data => {
        this.parentList = data
      })
        return this.parentList.data
    }
    ///EndParent
    ///Class
    async getAllClass(){
      await this.http.get(this.URL+"class/").toPromise().then(async data => {
        this.classList = data
      })
        return this.classList.data
    }
    ///EndClass
}
