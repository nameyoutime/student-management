import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/Student.model';
import { Teacher } from '../models/Teacher.model';
import { Subject } from '../models/Subject.model';
import { Class } from '../models/Class.model';
import { Parent } from '../models/Parent.model';
@Injectable({
  providedIn: 'root'
})
export class DataBUSService {
  public URL = "https://student-management-server.vercel.app/api/";
  public studentList: any;
  public student: any
  public teacherList: any;
  public teacher: any;
  public parentsList: any;
  public parents: any;
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
      this.parentsList = data
    })
    return this.parentsList.data
  }
  async getParentsDetail(Id: any) {
    await this.http.get(this.URL + `parents/${Id}`).toPromise().then(data => {
      this.parents=data
    })
    return this.parents.data;
  }
  async createParents(parents: Parent) {
    try {

      let result;
      await this.http.post(this.URL + `parents/`, { parents }).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async updateParents(parents: Parent) {
    try {
      let result;
      await this.http.put(this.URL + `parents/${parents._id}`, { parents }).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async deteleParents(Id: any) {
    try {
      let result;
      await this.http.delete(this.URL + `parents/${Id}`).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async searchParents(keyword: any) {

    await this.http.get(this.URL + `parents/keyword/${keyword}`).toPromise().then(data => {

      return this.parentsList = data
    })
    return this.parentsList.data
  }
  ///EndParent
  ///Class
  async getAllClass() {
    await this.http.get(this.URL + "class/").toPromise().then(async data => {
      this.classList = data
    })
    return this.classList.data
  }
  async getClassDetail(Id: any) {
    await this.http.get(this.URL + `class/${Id}`).toPromise().then(data => {
      this.class = data;
    })
    return this.class.data;
  }
  async createClass(newClass:Class) {
    try {

      let result;
      await this.http.post(this.URL + `class/`, {
      classes:{Description:newClass.Description }}).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async updateClass(newClass: Class) {
    try {
      let result;
      await this.http.put(this.URL + `class/${newClass._id}`,{
        classes:{Description:newClass.Description }}).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async deteleClass(Id: any) {
    try {
      let result;
      await this.http.delete(this.URL + `class/${Id}`).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async searchClass(keyword: any) {
    console.log(keyword)
    await this.http.get(this.URL + `class/keyword/${keyword}`).toPromise().then(data => {

      return this.classList = data
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
  async getSubjectDetail(Id: any) {
    await this.http.get(this.URL + `subject/${Id}`).toPromise().then(data => {
      this.subject = data;
    })
    return this.subject.data;
  }
  async createSubject(subject: Subject) {
    try {

      let result;
      await this.http.post(this.URL + `subject/`, { subject }).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async updateSubject(subject: Subject) {
    try {
      let result;
      await this.http.put(this.URL + `subject/${subject._id}`, { subject }).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async deteleSubject(Id: any) {
    try {
      let result;
      await this.http.delete(this.URL + `subject/${Id}`).toPromise().then(() => {
        result = true
      })
      return result;
    } catch { return false }

  }
  async searchSubject(keyword: any) {

    await this.http.get(this.URL + `subject/keyword/${keyword}`).toPromise().then(data => {

      return this.subjectList = data
    })
    return this.subjectList.data
  }
  ///EndSubject
}
