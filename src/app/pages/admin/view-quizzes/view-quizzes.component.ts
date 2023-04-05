import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes = [
    {
      qid: '',
      title: '',
      description: '',
      maxMarks: '',
      numberOfQuestions: '',
      active: '',
      category: {
        title: '',
        description: ''
      }
    },
  ];

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data!', 'error');
      }
    )

  }


  //Delete Quiz
  deleteQuiz(qId: any) {

    Swal.fire({
      icon: 'warning',
      title: 'Are you sure about deleting? ',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //Perform Delete
        this._quiz
          .deleteQuiz(qId)
          .subscribe(
            (data) => {

              this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qId)
              Swal.fire('Success', 'Quiz Deleted Successfully', 'success')

            },
            (error) => {
              Swal.fire('Error', 'Server Error', 'error')
            }
          );
      }
    })


  }

}
