import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { title } from 'process';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error, log } from 'console';

@Component({
  selector: 'app-view-quiz-questions',
  standalone: false,
  
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit{
  qId: any;
  qTitle: any;
  questions : any=[{
  
  }];
  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _snack: MatSnackBar){
  }

  ngOnInit(): void{
    this.qId = this._route.snapshot.paramMap.get('qid');
    this.qTitle = this._route.snapshot.paramMap.get('title');
    this._question.getQuestionsOfQuiz(this.qId).subscribe((data : any)=>{
      console.log(data);
      this.questions = data;
    },(error: any)=>{
      console.log(error);
    }
  );
  }

  // delete question
  deleteQuestion(qid:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure?',
    }).then((result=>{
      if (result.isConfirmed) {
        // confirm
        this._question.deleteQuestion(qid).subscribe((data: any)=>{
          this._snack.open('Question Deleted Successfully!','',{
            duration: 3000,
          });
          this.questions= this.questions.filter((q: any)=>
            q.quesId != qid);
          },(error: any)=>{
            this._snack.open('Error in deleting Question','',{
              duration: 3000,
            });
            console.log(error);
          });
      }
    }));
  }

}
