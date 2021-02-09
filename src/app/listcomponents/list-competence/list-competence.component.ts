import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Competence } from 'src/app/share/competence.model';
import { DomaineComponent } from 'src/app/components/domaine/domaine.component';
import { CompetenceComponent } from 'src/app/components/competence/competence.component';

@Component({
  selector: 'app-list-competence',
  templateUrl: './list-competence.component.html',
  styleUrls: ['./list-competence.component.css']
})
export class ListCompetenceComponent implements OnInit {

  listCatGen;
  listCompetence;
  competence:Competence= new Competence();

  public totalRecords:number;
  public page: number=0;
  public size: number= 20;
  pages:Array<number>;
 
  data: Array<any>;

  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService) { }

  ngOnInit(): void {
   this.getCompetences();
  }
   getCompetences(){
     let url = this.service.host+"competences?page="+this.page+"&size="+this.size;
     this.service.getRessource(url)
     .subscribe(data =>{
       this.listCompetence = data;
       this.totalRecords = data["page"].totalPages;
       this.pages = new Array<number>(this.totalRecords);
       console.log(data);
     })
   }

   oncreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.matDialog.open(CompetenceComponent,dialogConfig);
  }

  deletCompetence(id: number){
    if(confirm("Vous êtes sûr de le supprimer ?"))
   this.service.deletCompetence(id)
   .subscribe(data =>{
    this.toastrService.warning('Suppression réussi !', 'MyGesco APPLI, Supprimer'); 
    this.getCompetences();      
   },err =>{console.log(err)})
  }

  goTo(i, event: any){
    this.page=0;
   event.preventDefault();
    this.page = i;
    this.getCompetences();
    
  }
}
