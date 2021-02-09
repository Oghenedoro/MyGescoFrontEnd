import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/share/question.model';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DomaineComponent } from '../domaine/domaine.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Competence } from 'src/app/share/competence.model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

 listCompetence;
  question: Question= new Question();
  competence: Competence= new Competence();

  public totalRecords:number;
  public page: number=0;
  public size: 20;
  pages:Array<number>;

  constructor(public service: MyGescoService, private dialogRef: MatDialogRef<DomaineComponent>, 
    private router: Router, private toastrService: ToastrService) { }


  ngOnInit(): void {
    this.getCompetence();
  }
  

  getCompetence(){

    let url = this.service.host+"competences?page="+this.page+"&totalElements="+this.size;
    this.service.getRessource(url).subscribe(data =>{
     this.listCompetence = data;
    this.totalRecords = data["page"].totalPages;
    this.pages = new Array<number>(this.totalRecords);
    },err =>{
      console.log(err);
    })
  }
  createQuestion(){
    this.toastrService.success('Questionnaire crée avec success !', 'MyGesco APPli, Création !');
    this.service.creatQuestions(this.question,this.competence.id).subscribe(data =>{      
    this.question = new Question();
    })
  }
  deletQuestion(id: number){
    if(confirm("Vous êtes sûr de le supprimer ?"))
   this.service.deletQuestion(id)
   .subscribe(data =>{
    this.toastrService.warning('Suppression réussi !', 'MyGesco APPLI, Supprimer'); 
    this.service.getRessource(this.service.host+"questions");      
   },err =>{console.log(err)})
  }

  goTo(i){
    this.page=0;
    this.page = i;
    this.getCompetence();
    
  }
}
