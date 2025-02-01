import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { error } from 'console';

@Component({
  selector: 'app-view',
  standalone: false,
  
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{

  quizId: any
  qTitle: any;
  questions : any= [
    // {
    //   id: 1,
    //   qTitle: 'Question 1',
    //   content: 'What is the capital of France?',
    //   options: ['Paris', 'London', 'Berlin', 'Madrid']
    // },
    // {
    //   id: 2,
    //   qTitle: 'Question 2',
    //   description: 'Which planet is known as the Red Planet?',
    //   options: ['Earth', 'Mars', 'Jupiter', 'Saturn']
    // },
    // Add more questions as needed
  ];

  progress = 50; // Example progress value

  constructor(private _route: ActivatedRoute, private question: QuestionService){}
  ngOnInit(): void {
    this.quizId = this._route.snapshot.paramMap.get('qid');
    this.qTitle = this._route.snapshot.paramMap.get('title');
    this.question.getQuestionsOfQuiz(this.quizId).subscribe((data: any)=>{
      console.log(data);
      this.questions = data;
    },(error)=>{
      console.log(error);
      
    });
  }
  

}
