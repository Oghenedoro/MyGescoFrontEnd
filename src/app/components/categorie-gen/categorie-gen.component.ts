import { Component, OnInit } from '@angular/core';
import { CatGen } from 'src/app/share/cat-gen.model';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { Poste } from 'src/app/share/poste.model';


@Component({
  selector: 'app-categorie-gen',
  templateUrl: './categorie-gen.component.html',
  styleUrls: ['./categorie-gen.component.css']
})
export class CategorieGenComponent implements OnInit {

  listPost;
  catGen: CatGen=new CatGen();
  poste: Poste= new Poste();

  public totalRecords:number;
  public page: number=0;
  public size: 20;
  pages:Array<number>;
 

  constructor(private service: MyGescoService, private dialogRef: MatDialogRef<CategorieGenComponent>,
    private toastrService: ToastrService) { }


  ngOnInit(): void {
    this.getPosts();
  }

  createCatGenerique(){
    this.service.createCatGenerique(this.catGen,this.poste.id).subscribe(data =>{
     this.toastrService.success('Création Catégorie réussi !', 'MyGesco aPPLI');
     this.catGen=new CatGen();
    })
  }
  getPosts(){
    this.service.getPostes(this.page,this.size).subscribe(data =>{
      this.listPost = data;
    },err =>{console.log(err)})
   }

  
}
