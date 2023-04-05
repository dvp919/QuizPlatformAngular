import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{

  catId:any;
  quizzes:any;

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,

  ){}

  ngOnInit(): void {
    
    
    this._route.params.subscribe((params)=>{

      this.catId=params['catId'];
      
      if(this.catId==0)
    {
      console.log('Load all the quizzes')

      this._quiz.getActiveQuizzes().subscribe(
        (data)=>{
          this.quizzes = data;
          console.log(data)
        },
        (error)=>{
          alert('Server Error')
        }
      )

    }
    else
    {
      // alert(this.catId)
      this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
        (data)=>{
          this.quizzes=data;
        },
        (error)=>{
          Swal.fire("Error","Server Error while getting quizzes by category","error");
        }
      )
      
    }


    });

  }
}
