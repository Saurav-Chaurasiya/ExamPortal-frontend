import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  standalone: false,
  
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit {
quizzes: any= [];
 constructor(private _quiz: QuizService){}
 ngOnInit(): void {
     this._quiz.quizzes().subscribe((data: any)=>{
       this.quizzes = data;
       console.log(this.quizzes);
     }, (error)=>{
       console.log(error);
       Swal.fire('Error !', 'Error in loading data', 'error'); 
     }
    );
 }

  //  delete Quiz
  deleteQuiz(qId: any){
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure, want to delete this quiz ?',
    }).then((result)=>{
      if(result.isConfirmed){
        // delete
        this._quiz.deleteQuiz(qId).subscribe((data)=>{
          Swal.fire('Success !!', 'Quiz is deleted', 'success');
          this.quizzes = this.quizzes.filter((quiz: any)=> quiz.qId != qId);
        }, (error)=>{
          console.log(error);
          Swal.fire('Error !!', 'Error in deleting quiz', 'error');
        });
      }
    });
  }

}
