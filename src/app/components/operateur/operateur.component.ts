import { Component, OnInit } from '@angular/core';
import { Operateur } from 'src/app/share/operateur.model';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Poste } from 'src/app/share/poste.model';
import { Ponderation } from 'src/app/share/ponderation.model';

@Component({
  selector: 'app-operateur',
  templateUrl: './operateur.component.html',
  styleUrls: ['./operateur.component.css']
})
export class OperateurComponent implements OnInit {

  listPost;
  operateur: Operateur= new Operateur();
  post: Poste= new Poste();
  
  public totalRecords:number;
  public page: number=0;
  public size: 20;
  pages:Array<number>;


  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService) { }


  ngOnInit(): void {
    //this.getPosts();
  }
  onCreate(){
   this.service.creatOperateur(this.operateur).subscribe(data =>{
    this.toastrService.success('Créatuer crée avec success !', 'MyGesco APPli, Création !');
    this.operateur = new Operateur();
   
   })
  }
  getPosts(){
    this.service.getPostes(this.page,this.size).subscribe(data =>{
      this.listPost = data;
    },err =>{console.log(err)})
   }
}
