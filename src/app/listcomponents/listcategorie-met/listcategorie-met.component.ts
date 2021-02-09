import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategorieMetierComponent } from 'src/app/components/categorie-metier/categorie-metier.component';

@Component({
  selector: 'app-listcategorie-met',
  templateUrl: './listcategorie-met.component.html',
  styleUrls: ['./listcategorie-met.component.css']
})
export class ListcategorieMetComponent implements OnInit {

  listCatMet;
  public totalRecords:number;
  public page: number=0;
  public size:number= 20;
  pages:Array<number>;

  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getCatMetier();
  }

  getCatMetier(){
    this.service.getCatMetier(this.page,this.size).subscribe(data =>{
      this.listCatMet = data;
      this.totalRecords = data["page"].totalPages;
      this.pages = new Array<number>(this.totalRecords);
    },err =>{console.log(err)})
   }

   oncreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.matDialog.open(CategorieMetierComponent,dialogConfig);
  }

  deletCatMetier(id: number){
    if(confirm("Vous êtes sûr de le supprimer ?"))
   this.service.deletCatMetier(id)
   .subscribe(data =>{
     this.toastrService.warning('Suppression réussi !', 'MyGesco APPLI, Supprimer');
     this.getCatMetier();
   },err =>{console.log(err)})
  }

  goTo(i, event: any){
    this.page=0;
   event.preventDefault();
    this.page = i;
    this.getCatMetier();
 }
}