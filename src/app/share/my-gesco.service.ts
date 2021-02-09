import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CatMet } from './cat-met.model';
import { CatGen } from './cat-gen.model';
import { Domaine } from './domaine.model';
import { Poste } from './poste.model';
import { Competence } from './competence.model';
import { Question } from './question.model';
import { Reponse } from './reponse.model';
import { Operateur } from './operateur.model';
import { GestionPost } from './gestion-post.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MyGescoService {

  public host: string = "http://localhost:8888/";
  public poste: Poste;
  public competence: Competence;
  public question: Question;
  public reponse: Reponse;
  public operateur: Operateur;
  public gestionPost: GestionPost;

  constructor(private http: HttpClient,private auth: AuthenticationService) { }

    getPostes(page:number,size:number){
      let headers = new HttpHeaders({'Authorization':'Bearer '+this.auth.jwt})
      return this.http.get(this.host+"/postes?page="+page+"&size="+size+"&projection=p1",{headers:headers}); 
      }

      getCatG(p){
        return this.http.get(p._links.categoriesGenerique.href);
      }
     
     getCatGenerique(page:number, size:number){
       return this.http.get(this.host+"categorieGeneriques?page="+page+"&size="+size);
     }

     getAllCatGen(page:number, size:number){
      return this.http.get(this.host+"listcatgen?page="+page+"&size="+size);
     }

     getCompetence(c){
      return this.http.get(c._links.competences.href);
     }
     getQuestions(com){
      return this.http.get(com._links.questions.href);
     }
  
     getResponses(q){
      return this.http.get(q._links.reponses.href);
     }
     getDomaines(){
       let headers = new HttpHeaders({'Authorization':'Bearer '+this.auth.jwt})
      return this.http.get(this.host+"domaines",{headers:headers})
     }
     getCatMetier(page:number, size:number){
      return this.http.get(this.host+"categorieMetiers?page="+page+"&size="+size);
     }
    
     getGestionPost(page:number,size:number){
      return this.http.get(this.host+"/postCatGeneriques?page="+page+"&size="+size+"&projection=p1"); 
     }





     getAllPost(page: number, size: number){
      return this.http.get(this.host+"/listpost?page="+page+"&size="+size+"&projection=p1"); 
    }

    
    getAllOperateur(page: number, size: number){
      let headers = new HttpHeaders({'Authorization':'Bearer '+this.auth.jwt})
      return this.http.get(this.host+"/listoperateur?page="+page+"&size="+size,{headers:headers}); 
    }

    
     getRole(){
      return this.http.get(this.host+"roles");
     }
     getOperateurs(page:number,size:number){
      let headers = new HttpHeaders({'Authorization':'Bearer '+this.auth.jwt})
      return this.http.get(this.host+"operateurs?page="+page+"&size="+size,{headers:headers})
     }
  
        
     createCatMetier(cat: CatMet){
      return this.http.post(this.host+"categorieMetiers", cat);
     }
     createCatGenerique(cat: CatGen, idPost:number){
      return this.http.post(this.host+"savecatgen/"+idPost, cat);
     }
     createDomain(domain: Domaine){
      return this.http.post(this.host+"domaines/", domain);
     }
     managePost(poste,domId:number,roleId:number,opId:number){
      return this.http.post(this.host+"managepost/"+domId+"/"+roleId+"/"+opId, poste);
     }

     gestionPoste(gestionPost,postId:number,domId:number,roleId:number,opId:number){
      return this.http.post(this.host+"gestionpost/"+postId+"/"+domId+"/"+roleId+"/"+opId,gestionPost);
     } 
     
     



     calculateCompletion(operateur, postId: number,catId:number,opid:number){
      return this.http.post(this.host+"completion/"+postId+"/"+catId+"/"+opid, operateur);    
     }


     createReponse(reponse, postId: number,catId:number,compId:number,qId:number){
      return this.http.post(this.host+"passer/"+postId+"/"+catId+"/"+compId+"/"+qId, reponse);    
     }



     creatCompetence(competence: Competence, idCatGen:number){
      return this.http.post(this.host+"savecompetence/"+idCatGen, competence);
     }
     
     creatQuestions(question, compId: number){
      return this.http.post(this.host+"savequestion/"+compId, question);    
     }

     creatOperateur(operateur){
      return this.http.post(this.host+"saveoperateur/", operateur);    
     }

     creatPost(poste){
      return this.http.post(this.host+"savepost/", poste);    
     }
     

    
     deletDomaines(id: number){
      return this.http.delete(this.host+"domaines/"+id);
     }
     deletCatGenerique(id: number){
      return this.http.delete(this.host+"categorieGeneriques/"+id);
     }
     deletCatMetier(id: number){
      return this.http.delete(this.host+"categorieMetiers/"+ id);
     }

     deletPost(id: number){
      return this.http.delete(this.host+"delpost/"+ id);
     }
    
     deletCompetence(id: number){
      return this.http.delete(this.host+"delcompetence/"+ id);
     }

     deletQuestion(id: number){
      return this.http.delete(this.host+"delquestion/"+ id);
     }

     deletOperateur(id: number){
      return this.http.delete(this.host+"deloperateur/"+ id);
     }


     getRessource(url){
       return this.http.get(url);
     }

    
  }

  