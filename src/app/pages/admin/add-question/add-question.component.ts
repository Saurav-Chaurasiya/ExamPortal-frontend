import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { error } from 'console';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  standalone: false,
  
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {
  // public Editor : any = ClassicEditor;
  qId:any;
  qTitle: any;
  question: any=
    {
      quiz:{},
      content:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:'',
    };
  constructor(private _route: ActivatedRoute, private _question: QuestionService, private _quiz: QuizService, private _router: Router){

  }
  ngOnInit(): void{
    this.qTitle = this._route.snapshot.paramMap.get('title');
    this.qId = this._route.snapshot.paramMap.get('qid');
    this.question.quiz['qId'] = this.qId;
  }
  
  formSubmit(){
    if(this.question.content.trim() == '' || this.question.content == null){
      return;
    }
    if(this.question.option1.trim() == '' || this.question.option1 == null){
      return;
    }
    if(this.question.option2.trim() == '' || this.question.option2 == null){
      return;
    }
    if(this.question.answer.trim() == '' || this.question.answer == null){
      return;
    }

    this._question.addQuestion(this.question).subscribe((data: any)=>{
      Swal.fire('Success', 'Question Added Successfully', 'success').then((e)=>{
        // this._router.navigate(['/admin/view-questions']);
      });
      this.question.content='';
      this.question.option1='';
      this.question.option2='';
      this.question.option3='';
      this.question.option4='';
      this.question.answer='';
    },(error)=>{
      Swal.fire('Error', 'Error in Adding Question', 'error');
    }
  );
  }
}
