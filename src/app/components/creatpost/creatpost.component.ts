import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Poste } from 'src/app/share/poste.model';

@Component({
  selector: 'app-creatpost',
  templateUrl: './creatpost.component.html',
  styleUrls: ['./creatpost.component.css']
})
export class CreatpostComponent implements OnInit {

  poste: Poste = new Poste();

  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService) { }


  ngOnInit(): void {
   
  }

  CreatePost(){
    this.service.creatPost(this.poste).subscribe(data =>{
      this.toastrService.success('Poste crée avec success !', 'MyGesco APPli, Création !');
      this.poste= new Poste();
      
    },err =>{console.log(err)})
  }

}
