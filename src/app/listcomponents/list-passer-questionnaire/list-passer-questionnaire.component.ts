import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CatGen } from 'src/app/share/cat-gen.model';
import { PosteComponent } from 'src/app/components/poste/poste.component';
import { PassquestionnaireComponent } from 'src/app/components/passquestionnaire/passquestionnaire.component';
import { Reponse } from 'src/app/share/reponse.model';
import { Question } from 'src/app/share/question.model';
import { Operateur } from 'src/app/share/operateur.model';
import { Router } from '@angular/router';
import { Poste } from 'src/app/share/poste.model';
import { Competence } from 'src/app/share/competence.model';
//import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-list-passer-questionnaire',
  templateUrl: './list-passer-questionnaire.component.html',
  styleUrls: ['./list-passer-questionnaire.component.css']
})
export class ListPasserQuestionnaireComponent implements OnInit {
  //reponseForm: FormGroup;
 
  listQuestions;
  listCatgen;
  listCompetence;

  public totalRecords:number;
  public page: number=0;
  public size: 20;
  pages:Array<number>;
  catGen: CatGen= new CatGen;
  
  reponses:Reponse[];
  reponse: Reponse= new Reponse();

  question: Question= new Question();
  operateur: Operateur= new Operateur();
  poste: Poste= new Poste();
  competence: Competence= new Competence(); 

  addToTableData;
  mode: number = 0;
  mod: number = 0;
  listOperateur;
  listPost;
 
  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
     // this.reponseForm = this.fb.group({
       // field: this.fb.array([this.createItem()])       
    // }),
     
    this.getPosts();
    this.getListOperateur();
   // this.getReponse();
    this.initReponse();
 
}

//createItem(): FormGroup {
 // return this.fb.group({
   // intitule: '',
  //});
//}

//get field(){
 // return this.reponseForm.get('field') as FormArray;
//}
  
 // addBox(){
  //  this.field.push(this.createItem());
 // }

  initReponse() {
      this.reponses=   [
        {id: 1, intitule: 'Oui'},
        {id: 2, intitule: 'Non'}
      ];    
       console.log(this.reponse.intitule);
      
  }

 // get idQuestion(){
 //   return this.reponseForm.get('idQuestion') as FormControl;
 // }
 //  get selectBoxList(){
  //  return this.reponseForm.get('selectBoxList') as FormArray;
 // }


  getIdPostByClick(p) {
    this.poste.id = p.id;
   }
   getIdCatByClick(c){
     this.catGen.id = c.id;
   }
   getIdCompByClick(com){
    this.competence.id = com.id;
  }
  getIdQuestByClick(q){
   //var idQ =this.reponseForm.get("idQuestion").value;
  // idQ = q.id;
   this.question.id = q.id;
  }
  ChangeValue(){
    //this.toStr = JSON.stringify;
   // this.reponse=JSON.parse(event.target.value)
 // console.log(this.reponse); 
  }

  getPosts(){
    this.service.getPostes(this.page, this.size).subscribe(data =>{
      this.listPost = data;
    },err =>{console.log(err)})
   }
  getCatGen(p){
    this.mod=1;
    this.service.getCatG(p).subscribe(data =>{
     this.listCatgen = data; 
    },err =>{console.log(err)})
   }


   getCompetences(c){
   this.service.getCompetence(c).subscribe(data =>{
   this.listCompetence = data;
   },err =>{console.log(err)})
  }

   goTo(i){
    this.page=0;
    this.page = i;
    this.getPosts();
    
  }
  getQuestions(com){
    this.mode=2;
    this.service.getQuestions(com)
    .subscribe(data =>{
     this.listQuestions = data;
   },err =>{console.log(err)})
  }


  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.matDialog.open(PassquestionnaireComponent,dialogConfig);
   }

  
 getListOperateur(){
  let url = this.service.host+"operateurs?page="+this.page+"&size="+this.size;
  this.service.getRessource(url)
  .subscribe(data =>{
    this.listOperateur = data;
    this.totalRecords = data["page"].totalPages;
    this.pages = new Array<number>(this.totalRecords);
  },err =>{ console.log(err)});
  
 }

creatReponse(){    
  
  //this.reponses.forEach(r =>{
   // var rep = this.reponseForm.controls.reponses.patchValue(this.reponses[0].id);
   // this.reponse.intitule = JSON.stringify(rep);
   // this.reponse = r;
  //})
  //const selectedReponseIds = this.reponseForm.value.reponses
     // .map((v, i) => (v ? this.reponses[i].id : null))
    //  .filter(v => v !== null);
   // this.reponses.forEach(r =>{
    //  this.reponse = r;
   // })
  //this.reponse = this.reponses.
  this.reponses.forEach(r =>{
    this.reponse = r;
    JSON.stringify(this.reponse);
  })
  this.service.createReponse(this.reponse, this.poste.id, this.catGen.id,this.competence.id,this.question.id)  
  .subscribe(data =>{
    this.toastrService.success('Questionnaire envoyé avec success !', 'MyGesco APPli, Création !');
  }, err =>{ console.log(err)})
}

quitterQuestionnaire(){
 this.router.navigateByUrl("/viewlistquestions");

}

goTo2(n){
  this.page=0;
  this.page = n;
  this.getListOperateur();

}


}