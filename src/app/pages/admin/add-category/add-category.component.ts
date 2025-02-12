import { Component } from '@angular/core';
import { title } from 'process';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  standalone: false,

  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  category = {
    title: '',
    description: '',
  };

  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }
  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    // all done

    this._category.addCategory(this.category).subscribe(

      (data: any) => {
        this.category.title = '';
        this.category.description = '';
        Swal.fire('Success !!', 'Category is added !!', 'success');
      },
      (error : any) => {
        console.log(error);
        Swal.fire('Error !!', 'Server Error !!', 'error');
      }
    );
  }
}
