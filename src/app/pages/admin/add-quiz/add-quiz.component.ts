import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories = [
    {
      cid: 23,
      title: 'Dhruv',
    },
    {
      cid: 24,
      title: 'Patel',
    }
  ];


  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };

  

  constructor(private _cat: CategoryService, private _snackBar: MatSnackBar, private _quiz:QuizService) { }

  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data: any) => {
        //Categories Load
        this.categories = data;
        // console.log(this.categories);

      },
      (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Error for fetching Categories', 'error');
      }
    )
  }

  addQuiz() {

    if (this.quizData.title.trim() == '' || this.quizData.title == null) {

      this._snackBar.open("Title Required !!",'',
      {
        duration:3000,
      })

    }


    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        Swal.fire('Success !', 'Quiz added successfully', 'success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: '',
          },
        };
      },
      (error: any) => {
        Swal.fire('Error !', 'Server Error, Please check logs', 'error');
        console.log(error);
        
      }
      
    );

  }
}
