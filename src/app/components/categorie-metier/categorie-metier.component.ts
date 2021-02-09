import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CategorieGenComponent } from '../categorie-gen/categorie-gen.component';
import { ToastrService } from 'ngx-toastr';
import { CatMet } from 'src/app/share/cat-met.model';

@Component({
  selector: 'app-categorie-metier',
  templateUrl: './categorie-metier.component.html',
  styleUrls: ['./categorie-metier.component.css']
})
export class CategorieMetierComponent implements OnInit {

  catMetier: CatMet =new CatMet();

  constructor(private service: MyGescoService, private dialogRef: MatDialogRef<CategorieGenComponent>,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  createCatMetier(){
    this.service.createCatMetier(this.catMetier).subscribe(data =>{
     this.toastrService.success('Création Catégorie Metier réussi !', 'MyGesco APPLI');
     this.catMetier=new CatMet();
    })
  }
}
