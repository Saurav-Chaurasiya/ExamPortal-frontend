import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  standalone: false,
  
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit{
  quizzes: any;
  catId: any;
  constructor(
    private _route : ActivatedRoute,
    private _quiz: QuizService,
  ){}
  ngOnInit(): void {
   this._route.params.subscribe((params)=>{
    this.catId =  this._route.snapshot.paramMap.get('catId');
    if (this.catId == 0) {
      console.log('Load all the quiz');
  
      this._quiz.getActiveQuizzes().subscribe(
        (data: any)=>{
          this.quizzes = data;
          console.log(this.quizzes);
        },
        (error: any)=>{
          console.log(error);
          Swal.fire('Error','Error in loading all quizzes','error');
        }
      );
     }else{
      console.log('Load specific quiz');
      this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data: any)=>{
        this.quizzes = data;
      },
      (error: any)=>{
        Swal.fire('Error','Error in loading data','error');
      }
    );
     }
   });
   
  }
}
