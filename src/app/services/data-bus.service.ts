import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/Student.model';
import { Teacher } from '../models/Teacher.model';

@Injectable({
  providedIn: 'root'
})
export class DataBUSService {
  public URL = "http://localhost:8080/api/";
  public studentList: any;
  public student: any
  public teacherList: any;
  public teacher: any;
  public parentList: any;
  public parent: any;
  public classList: any;
  public class: any;
  public subjectList: any;
  public subject: any;
  constructor(public http: HttpClient) { }

  /////Student
  async getAllStudent() {
    await this.http.get(this.URL + "student/").toPromise().then(async data => {
      this.studentList = data
    })
    return this.studentList.data
  }
  async getStudentDetail(Id: any) {
    await this.http.get(this.URL + `student/${Id}`).toPromise().then(data => {
      this.teacher = data;
    })
    return this.teacher.data;
  }
  async createStudent(student: Student) {
    try {
      let result;
      await this.http.post(this.URL + `student/`, { student }).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async updateStudent(student: Student) {
    try {
      let result;
      await this.http.put(this.URL + `student/${student._id}`, { student }).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async deteleStudent(Id: any) {
    try {
      let result;
      await this.http.delete(this.URL + `student/${Id}`).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async searchStudent(keyword: any) {

    await this.http.get(this.URL + `student/keyword/${keyword}`).toPromise().then(data => {

      return this.studentList = data
    })
    return this.studentList.data
  }
  /////End Student

  ///Teacher

  async getAllTeacher() {
    await this.http.get(this.URL + "teacher/").toPromise().then(async data => {
      this.teacherList = data
    })
    return this.teacherList.data
  }
  async getTeacherDetail(Id: any) {
    await this.http.get(this.URL + `teacher/${Id}`).toPromise().then(data => {
      this.student = data;
    })
    return this.student.data;
  }
  async createTeacher(teacher: Teacher) {
    try {
      let result;
      await this.http.post(this.URL + `teacher/`, { teacher }).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async updateTeacher(teacher: Teacher) {
    try {
      let result;
      await this.http.put(this.URL + `teacher/${teacher._id}`, { teacher }).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async deteleTeacher(Id: any) {
    try {
      let result;
      await this.http.delete(this.URL + `teacher/${Id}`).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async searchTeacher(keyword: any) {

    await this.http.get(this.URL + `teacher/keyword/${keyword}`).toPromise().then(data => {

      return this.teacherList = data
    })
    return this.teacherList.data
  }
  ///EndTeacher


  ///Parent
  async getAllParent() {
    await this.http.get(this.URL + "parents/").toPromise().then(async data => {
      this.parentList = data
    })
    return this.parentList.data
  }
  ///EndParent
  ///Class
  async getAllClass() {
    await this.http.get(this.URL + "class/").toPromise().then(async data => {
      this.classList = data
    })
    return this.classList.data
  }
  ///EndClass
  ///Subject
  async getAllSubject() {
    await this.http.get(this.URL + "subject/").toPromise().then(async data => {
      this.subjectList = data
    })
    return this.subjectList.data
  }
  ///EndSubject
}
