import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PosteComponent } from 'src/app/components/poste/poste.component';
import { Poste } from 'src/app/share/poste.model';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  
  listPost;
  public totalRecords:number;
  public page: number=0;
  public size:number= 20;
  pages:Array<number>;
  listPosts:Array<any>;

  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService) { }


  ngOnInit(): void {
    this.getPosts();
    }

  getPosts(){
     this.service.getGestionPost(this.page, this.size).subscribe(data =>{
      this.listPost = data;
      this.totalRecords = data["page"].totalPages;
      this.pages = new Array<number>(this.totalRecords);
    },err =>{console.log(err)})
   }

   getAllPost(){
     this.service.getAllPost(this.page,this.size).subscribe(data =>{
       this.listPost = data['content'];
     },err =>{console.log(err)})
   }

   oncreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.matDialog.open(PosteComponent,dialogConfig);
   }
  
   
   goTo(i, event: any){
    // this.page=0;
    event.preventDefault();
     this.page = i;
     this.getPosts();
     
   }
    
  
  deletPost(id: number){
    if(confirm("Vous êtes sûr de le supprimer ?"))
   this.service.deletPost(id).subscribe(data =>{
    this.toastrService.warning('Suppression réussi !', 'MyGesco APPLI, Supprimer');
    this.getPosts();
   },err=>{

   })
  }
 
}
