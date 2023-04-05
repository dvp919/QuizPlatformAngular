import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  public Editor: any = ClassicEditor;
  qId=0;
  qTitle='';
  question={
    quiz:{qId:0},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }


  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
  ){}

  ngOnInit(): void {
    
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qId'] = this.qId;

  }


  formSubmit() {
    
    if(this.question.content.trim()=='' || this.question.content==null)
    {
      return; 
    }

    if(this.question.option1.trim()=='' || this.question.option1==null)
    {
      return; 
    }

    if(this.question.option2.trim()=='' || this.question.option2==null)
    {
      return; 
    }

    if(this.question.option3.trim()=='' || this.question.option3==null)
    {
      return; 
    }

    if(this.question.option4.trim()=='' || this.question.option4==null)
    {
      return; 
    }

    if(this.question.answer.trim()=='' || this.question.answer==null)
    {
      return; 
    }


    this._question.addQuestion(this.question,this.qId).subscribe(
      (data:any) => {
        Swal.fire("Success !","Successfully Added Question in "+this.qTitle,"success");
        // this.question = data;
        this.question.content='',
        this.question.answer='',
        this.question.option1='',
        this.question.option2='',
        this.question.option3='',
        this.question.option4='',
        console.log(this.question);
      },
      (error:any) => {
        Swal.fire("Error !","Server ever , unable to enter question in "+this.qTitle,"error");
        console.log(error);
      }

    )

  }


}
