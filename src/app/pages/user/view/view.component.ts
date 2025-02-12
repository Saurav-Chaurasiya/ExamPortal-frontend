import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  quizId: any;
  qTitle: any;
  questions: any = [];

  constructor(private _route: ActivatedRoute, private question: QuestionService) {}

  ngOnInit(): void {
    this.quizId = this._route.snapshot.paramMap.get('qid');
    this.qTitle = this._route.snapshot.paramMap.get('title');
    this.question.getQuestionsOfQuiz(this.quizId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}