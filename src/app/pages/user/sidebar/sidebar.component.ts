import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  categories:any;
  
  constructor(
    private _cat:CategoryService,
    private _snackbar:MatSnackBar
  ){}

  ngOnInit(): void {
    
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
      (error)=>{
        this._snackbar.open('Error while updating categories,Server error','',{
          duration:3000,
        });
        // Swal.fire('Error','Error while loading categories, Server Error','error');
        console.log(error);
      }
    )

  }

}
