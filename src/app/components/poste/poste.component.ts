import { Component, OnInit } from '@angular/core';
import { Poste } from 'src/app/share/poste.model';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { Domaine } from 'src/app/share/domaine.model';
import { Role } from 'src/app/share/role.model';
import { MatDialogRef } from '@angular/material/dialog';
import { DomaineComponent } from '../domaine/domaine.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { OperateurComponent } from '../operateur/operateur.component';
import { Operateur } from 'src/app/share/operateur.model';
import { GestionPost } from 'src/app/share/gestion-post.model';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.css']
})
export class PosteComponent implements OnInit {

  posteForm: NgForm;
 
  poste: Poste= new Poste();
  domaine: Domaine= new Domaine();
  role:Role = new Role();
  operateur: Operateur= new Operateur();
  gestionPost: GestionPost= new GestionPost();

  listRoles;
  listDomain;
  listOperateur;
  listPost;

  public totalRecords:number;
  public page: number=0;
  public size:number= 20;
  pages:Array<number>;
  
  constructor(public service: MyGescoService, private dialogRef: MatDialogRef<DomaineComponent>, 
    private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getPosts();
    this.getDomaine();
    this.getRoles();
    this.getOperateur();
  }

  getPosts(){
    this.service.getPostes(this.page, this.size).subscribe(data =>{
     this.listPost = data;
     this.totalRecords = data["page"].totalPages;
     this.pages = new Array<number>(this.totalRecords);   
   },err =>{console.log(err)})
  }

  getDomaine(){
    this.service.getDomaines().subscribe(data =>{
      this.listDomain = data;
    },err =>{console.log(err)})
   }

   getRoles(){
    this.service.getRole().subscribe(data =>{
      this.listRoles = data;
    },err =>{console.log(err)})
   }

   onCreate(){
    this.toastrService.success('Poste crée avec success !', 'MyGesco APPli, Création !');
    this.service.managePost(this.poste,this.domaine.id, this.role.id,this.operateur.id).subscribe(data =>{
    this.poste = new Poste();
    })
  }

  creatGestionPost(){
    this.toastrService.success('Poste crée avec success !', 'MyGesco APPli, Création !');
    this.service.gestionPoste(this.gestionPost,this.poste.id,this.domaine.id,this.role.id,this.operateur.id).subscribe(data =>{
    this.gestionPost = new GestionPost();
    })
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

   goTo(i, event: any){
    this.page=0;
    event.preventDefault();
     this.page = i;
     this.getOperateur();
     
   }
  }

