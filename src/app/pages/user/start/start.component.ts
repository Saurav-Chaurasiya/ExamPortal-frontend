import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { log } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  standalone: false,
  
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {
  qid: any;
  isPassed: boolean = false;
  questions: any;
  marksGot: any;
  correctAnswers: any;
  attempted : any;
  isSubmit = false;
  timer: any;
  constructor(
    private _locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question : QuestionService,

  ){}
  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.paramMap.get('qid');
    console.log(this.qid);
    this.loadQuestions();
    
  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any)=>{
        this.questions = data;
        // set time for quiz / timer
        this.timer=this.questions.length * 2 * 60;
       
        console.log(this.questions);
        this.startTimer();
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz','error');
        
      }
    )
  }
  preventBackButton()
  {
    history.pushState(null,location.href);
    this._locationSt.onPopState(()=>{
      history.pushState(null, location.href);
    });
  }

  submitQuiz()
  {
      Swal.fire({
          title: 'Do you want to submit the quiz?',
          showCancelButton: true,
          confirmButtonText: 'Submit',
          icon:'info',
      }).then((e)=>{
        if (e.isConfirmed) {
          this.evalQuiz();
        }
      });
  }

  startTimer()
  {
    let t = window.setInterval(()=>{
      // code
      if (this.timer <=0) {
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    }, 1000);
  }
  getFormattedTime()
  {
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm *60;
    return `${mm} min : ${ss} sec`;
  }

evalQuiz() {
  this._question.evalQuiz(this.questions).subscribe(
    (data: any) => {
      console.log(data);
      this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers = data.correctAnswer;
      this.attempted = data.attempted;
      this.isSubmit = true;

      // Determine pass/fail status (assuming 50% is the passing mark)
      let totalQuestions = this.questions.length;
      let passingMarks = totalQuestions * 0.5; // Adjust this as needed
      this.isPassed = this.marksGot >= passingMarks;
    },
    (error) => {
      console.log(error);
      Swal.fire('Error', 'Error in loading data', 'error');
    }
  );
}

  printPage(){
    window.print();
  }
}
