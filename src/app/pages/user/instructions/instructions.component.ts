import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  standalone: false,
  
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit{
  qid:any;
  quiz: any;
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router
  ){}
  ngOnInit(): void {
    this.qid = this._route.snapshot.paramMap.get('qid');
    // console.log(this.qid);

    this._quiz.getQuiz(this.qid).subscribe(
      (data: any)=>{
        // console.log(data);
        this.quiz = data;
      },
      (error)=>{
        Swal.fire('Error','Error in loading data','error');
      }
    );
  }
  userInput: string = '';
  startQuiz(){
    if (this.userInput.toLowerCase() === 'start'){
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      icon:'info',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/'+ this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }else {
    // Display an error message
    Swal.fire('Error','Please type "start" in the box and click the "Start" button.','info');
  }
}

}
