import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  standalone: false,

  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit {


  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  categories: any = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    }
  }

  constructor(private _cat: CategoryService, private _snack: MatSnackBar, private _quiz: QuizService, private _router: Router) { }
  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
        // console.log(this.categories);
      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }
  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title is required !!', '', {
        duration: 3000,
      });
      return;
    }

    // validation
    // call server
    this._quiz.addQuiz(this.quizData).subscribe((data: any) => {
      // console.log(data);
      Swal.fire('Success !!', 'Quiz is added', 'success').then((e) =>{
        this._router.navigate(['/admin/quizzes']);
      });
      this.quizData = {
        title: '',
        description: '',
        maxMarks: '',
        numberOfQuestions: '',
        active: true,
        category: {
          cid: ''
        },
      };
    }, (error: any) => { 
      Swal.fire('Error !!', 'Error in saving quiz', 'error');
      console.log(error);
     });
  }
}
