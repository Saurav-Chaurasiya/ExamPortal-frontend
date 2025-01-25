import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  standalone: false,
  
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit {

  categories: any = [];
  constructor(private category: CategoryService) { }

  ngOnInit(): void {
      this.category.categories().subscribe((data : any) => {
        this.categories = data;
        console.log(this.categories);
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data', 'error');
      });
  }
}
