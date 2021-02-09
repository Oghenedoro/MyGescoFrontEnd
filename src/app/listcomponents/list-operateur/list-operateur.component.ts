import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { QuestionnaireComponent } from 'src/app/components/questionnaire/questionnaire.component';
import { OperateurComponent } from 'src/app/components/operateur/operateur.component';
import { Poste } from 'src/app/share/poste.model';

@Component({
  selector: 'app-list-operateur',
  templateUrl: './list-operateur.component.html',
  styleUrls: ['./list-operateur.component.css']
})
export class ListOperateurComponent implements OnInit {

  listOperateur;
  post: Poste= new Poste();

  public totalRecords:number;
  public page: number=0;
  public size: number = 20;
  pages:Array<number>;

  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService) { }


  ngOnInit(): void {
    this.getOperateur();
  }

  getOperateur(){
    let url = this.service.host+"operateurs?page="+this.page+"&size="+this.size;
    this.service.getRessource(url)
    .subscribe(data =>{
      this.listOperateur = data;
      this.totalRecords = data["page"].totalPages;
      this.pages = new Array<number>(this.totalRecords);
    },err =>{console.log(err)})
   }

   getListOperateur(){
     this.service.getAllOperateur(this.page, this.size).subscribe(data =>{
      this.listOperateur = data['content'];
      this.pages = new Array(data['totalPages']);
     },err =>{console.log(err)})
   }

   oncreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.matDialog.open(OperateurComponent,dialogConfig);
  }

  deletOperateur(id: number){
    if(confirm("Vous êtes sûr de le supprimer ?"))
   this.service.deletOperateur(id)
   .subscribe(data =>{
    this.toastrService.warning('Suppression réussi !', 'MyGesco APPLI, Supprimer'); 
    this.getOperateur();      
   },err =>{console.log(err)})
  }

  goTo(i, event: any){
    this.page=0;
   event.preventDefault();
    this.page = i;
    this.getOperateur();
    
  }
}
