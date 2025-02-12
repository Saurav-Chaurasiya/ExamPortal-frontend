import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  standalone: false,
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any = [];
  filteredQuizzes: any = [];
  categories: any= [];
  searchText: string = '';
  selectedCategory: string = '';

  constructor(private _quiz: QuizService) {}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe((data: any) => {
      this.quizzes = data;
      this.filteredQuizzes = data;  // Initialize filteredQuizzes with all quizzes
      this.extractCategories();
    }, (error) => {
      console.log(error);
      Swal.fire('Error!', 'Error in loading data', 'error'); 
    });
  }

  extractCategories() {
    this.categories = [...new Set(this.quizzes.map((quiz: any) => quiz.category.title))];
  }

  filterQuizzes() {
    this.filteredQuizzes = this.quizzes.filter((quiz: any) => {
      const matchesName = quiz.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesCategory = this.selectedCategory ? quiz.category.title === this.selectedCategory : true;
      return matchesName && matchesCategory;
    });
  }

  deleteQuiz(qId: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure you want to delete this quiz?',
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qId).subscribe(() => {
          Swal.fire('Success!', 'Quiz is deleted', 'success');
          this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId !== qId);
          this.filterQuizzes();  // Apply filter after deleting
        }, (error: any) => {
          console.log(error);
          Swal.fire('Error!', 'Error in deleting quiz', 'error');
        });
      }
    });
  }
}
