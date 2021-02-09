import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PosteComponent } from 'src/app/components/poste/poste.component';
import { CreatpostComponent } from 'src/app/components/creatpost/creatpost.component';
import { Poste } from 'src/app/share/poste.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  listPost;
  public totalRecords:number;
  public page: number=0;
  public size:number= 20;
  pages:Array<number>;
  listPosts:Array<any>;

  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getPosts();
   // this.filterData();
     
  }

  getPosts(){
    this.service.getPostes(this.page, this.size).subscribe(data =>{
      
     this.listPost = data;
     this.totalRecords = data["page"].totalPages;
     this.pages = new Array<number>(this.totalRecords);   
   },err =>{console.log(err)})
  }

  goTo(i, event: any){
     this.page=0;
    event.preventDefault();
     this.page = i;
     this.getPosts();
     
   }

   createPost(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.matDialog.open(CreatpostComponent,dialogConfig);
   }

   deletPost(id: number){
    if(confirm("Vous êtes sûr de le supprimer ?"))
   this.service.deletPost(id).subscribe(data =>{
    this.toastrService.warning('Suppression réussi !', 'MyGesco APPLI, Supprimer');
    this.getPosts();
   },err=>{

   })
  }
  filterData(){
    //this.listPost=this.listPost.filter((item, index) =>this.listPost.indexOf(item)===index);
    //const uniqueSet = new Set(array);
  
  }
}
