import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Competence } from 'src/app/share/competence.model';
import { CatGen } from 'src/app/share/cat-gen.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.css']
})
export class CompetenceComponent implements OnInit {

  listCatGen;
  listCompetence;
  competence:Competence= new Competence();
  catGen: CatGen= new CatGen();

  public totalRecords:number;
  public page: number=0;
  public size: 20;
  pages:Array<number>;
 
  data: Array<any>;

  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService,
    private router: Router) { }


  ngOnInit(): void {
    this.getCateGen();
  }

  getCateGen(){
    this.service.getCatGenerique(this.page,this.size).subscribe(data =>{
      this.listCatGen = data;
      this.totalRecords = data["page"].totalPages; 
      this.pages = new Array<number>(this.totalRecords);
    },err =>{console.log(err)})
   }

   getCompetences(c){

    this.service.getCompetence(c).subscribe(data =>{
      this.listCompetence = data;
    },err =>{console.log(err)})
   }

   createCompetence(){
    this.toastrService.success('Création réussi !', 'MyGesco APPLI, Création !');
    this.service.creatCompetence(this.competence, this.catGen.id).subscribe(data =>{ 
      },err =>{console.log(err)})

   }

      goTo(i){
      this.page=0;
      this.page = i;
      this.getCateGen();
}
}