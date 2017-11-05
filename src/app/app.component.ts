import { Component } from '@angular/core';
import { StudentService} from '../providers/students';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  modal: boolean = false;
  editmodal: boolean = false;
  deletemodal: boolean = false;
  students: Array<any> = [];
  loading: boolean = false;
  modalLoading: boolean = false;
  selectedStudent: any = {};
  newStudent: any = {};
  editStudent: any = {};
  ind: number = 0;

  constructor( public _studentService: StudentService) {
    this.newStudent = {
      title: '',
      fname: '',
      mname: '',
      dob: '',
      gender: 'male',
      admission_date: '',
      class: 'Grade 5'
    };
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this._studentService.getStudents('https://nameless-brook-50981.herokuapp.com/student')
      .subscribe(data => {
        this.students = data;
        this.loading = false;
      }, err => {
        this.loading = false;
        console.log(err);
      });
  }

  openModal() {

    this.modal = ! this.modal;
    this.newStudent = {
      title: '',
      fname: '',
      mname: '',
      dob: '',
      gender: 'male',
      admission_date: '',
      class: 'Grade 5'
    };

  }

  editModal() {
    this.editStudent = this.selectedStudent;
    this.editmodal = ! this.editmodal;

  }

  deleteModal() {

    this.deletemodal = ! this.deletemodal;

  }

  deleteStudent() {
    this.modalLoading = true;
    this._studentService.deleteStudent("https://nameless-brook-50981.herokuapp.com/student/" + this.selectedStudent._id)
      .subscribe(data => {
        this.modalLoading = false;
        console.log(data);
        this.students.splice(this.ind, 1);
        this.deleteModal();
        this.selectedStudent = {};
      }, err => {
        console.log(err);
        this.modalLoading = false;
      })
  }

  updateStudent() {
    let stu = this.editStudent;

    if (stu.fname && stu.lname && stu.dob && stu.gender && stu.admission_date) {
      stu.admission_date = new Date(stu.admission_date);
      stu.dob = new Date(stu.dob);
      console.log(stu);

      this.modalLoading = true;
      this._studentService.updateStudent('https://nameless-brook-50981.herokuapp.com/student/' + stu._id, JSON.stringify(stu))
        .subscribe(data => {
          this.modalLoading = false;
          this.selectedStudent = stu;
          this.loadData();
          this.editModal();
        }, err => {
          this.modalLoading = false;
          console.log(err);
        })
    } else {
      alert("Please fill all the data");
    }    
  }

  saveStudent() {
    

    let stu = this.newStudent;

    if (stu.fname && stu.lname && stu.dob && stu.gender && stu.admission_date) {
      stu.admission_date = new Date(stu.admission_date);
      stu.dob = new Date(stu.dob);
      console.log(stu);

      this.modalLoading = true;
      this._studentService.addStudent('https://nameless-brook-50981.herokuapp.com/student', JSON.stringify(stu))
        .subscribe(data => {
          this.modalLoading = false;
          this.loadData();
          this.openModal();
          this.newStudent = {
            title: '',
            fname: '',
            mname: '',
            dob: '',
            gender: 'male',
            admission_date: '',
            class: 'Grade 5'
          };
        }, err => {
          this.modalLoading = false;
          console.log(err);
        })
    } else {
      alert("Please fill all the data");
    }
  }

  selectStudent(val, ind) {
    this.selectedStudent = val;
    this.ind = ind;
  } 
}
