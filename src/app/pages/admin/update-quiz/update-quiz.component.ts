import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { ThemePalette } from '@angular/material/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-quiz',
  standalone: false,
  
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent {
  color: ThemePalette = 'accent';
    checked = false;
    disabled = false;
    categories: any = [];

  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _cat: CategoryService, private _router: Router) { }

  qId: any;
  quiz: any;

  ngOnInit(): void {
    this.qId = this._route.snapshot.paramMap.get('qid');
    // alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
        alert('Error in loading quiz');
      }
    );
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        alert('Error in loading categories');
      }
    );
  }

  // update form submit
  public UpdateData() {
    // validate data
    this._quiz.updateQuiz(this.quiz).subscribe((data: any)=>{
      Swal.fire('Success', 'Quiz updated successfully', 'success').then((e)=>{
        this._router.navigate(['/admin/quizzes']);
      });
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error', 'Error in updating quiz', 'error');
    }
  );
  }
}
