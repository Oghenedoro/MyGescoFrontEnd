import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CategorieGenComponent } from 'src/app/components/categorie-gen/categorie-gen.component';
import { ToastrService } from 'ngx-toastr';
import { MyGescoService } from 'src/app/share/my-gesco.service';

@Component({
  selector: 'app-listcategorie-gen',
  templateUrl: './listcategorie-gen.component.html',
  styleUrls: ['./listcategorie-gen.component.css']
})
export class ListcategorieGenComponent implements OnInit {

  listCatgen;
  public totalRecords:number;
  public page: number=0;
  public size:number= 20;
  pages:Array<number>;

  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService) { }

  ngOnInit(): void {
   this.getCatGen();
  
  }

  getCatGen(){
    this.service.getCatGenerique(this.page,this.size).subscribe(data =>{
      this.listCatgen = data;
      this.totalRecords = data["page"].totalPages;
      this.pages = new Array<number>(this.totalRecords);
    },err =>{console.log(err)})
   }

  getAllCatGene(){
    this.service.getAllCatGen(this.page,this.size).subscribe(data =>{
      this.listCatgen = data;
      this.totalRecords = data["page"].totalPages;
      this.pages = new Array<number>(this.totalRecords);
    },err =>{console.log(err)})
  }




   oncreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.matDialog.open(CategorieGenComponent,dialogConfig);
  }
   
  deletCatGen(id: number){
    if(confirm("Vous êtes sûr de le supprimer ?"))
   this.service.deletCatGenerique(id)
   .subscribe(data =>{
     this.toastrService.warning('Suppression réussi !', 'MyGesco APPLI, Supprimer');
     this.getCatGen();
   },err =>{console.log(err)})
  }

  goTo(i, event: any){
    this.page=0;
   event.preventDefault();
    this.page = i;
    this.getCatGen();
    
  }
}

