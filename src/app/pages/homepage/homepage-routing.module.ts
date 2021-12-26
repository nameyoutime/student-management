import { ParentsComponent } from './../../components/parents/parents.component';
import { SubjectComponent } from './../../components/subject/subject.component';
import { TeacherComponent } from './../../components/teacher/teacher.component';
import { StudentComponent } from './../../components/student/student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { ClassComponent } from 'src/app/components/class/class.component';


const routes: Routes = [{
  path: '', component: HomepageComponent, children: [
    { path: 'student', component: StudentComponent },
    { path: 'teacher', component: TeacherComponent },
    { path: 'subject', component: SubjectComponent },
    { path: 'class', component: ClassComponent },
    { path: 'parents', component: ParentsComponent },


  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
