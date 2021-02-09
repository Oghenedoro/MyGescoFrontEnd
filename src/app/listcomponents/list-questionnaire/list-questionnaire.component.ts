import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DomaineComponent } from 'src/app/components/domaine/domaine.component';
import { QuestionnaireComponent } from 'src/app/components/questionnaire/questionnaire.component';

@Component({
  selector: 'app-list-questionnaire',
  templateUrl: './list-questionnaire.component.html',
  styleUrls: ['./list-questionnaire.component.css']
})
export class ListQuestionnaireComponent implements OnInit {

  listCatGen;
  listCompetence;
  listQuestions;
  listReponse;
  
  currentCatGen;

  public totalRecords:number;
  public page: number=0;
  public size:number= 20;
  pages:Array<number>;
 
  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService) {
     
   }

  ngOnInit(): void {
    this.getQuestions();
  }

   getQuestions(){
     let url = this.service.host+"questions?page="+this.page+"&size="+this.size;
     this.service.getRessource(url).
     subscribe(data =>{
      this.listQuestions = data;
      this.totalRecords = data["page"].totalPages;
      this.pages = new Array<number>(this.totalRecords);
    },err =>{console.log(err)})
   }


  goTo(i, event: any){
    this.page=0;
   event.preventDefault();
    this.page = i;
    this.getQuestions();
    
  }


  oncreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.matDialog.open(QuestionnaireComponent,dialogConfig);
  }
  deletQuestion(id: number){
    if(confirm("Vous êtes sûr de le supprimer ?"))
   this.service.deletQuestion(id)
   .subscribe(data =>{
    this.toastrService.warning('Suppression réussi !', 'MyGesco APPLI, Supprimer'); 
    this.getQuestions();    
   },err =>{console.log(err)})
  }
}
