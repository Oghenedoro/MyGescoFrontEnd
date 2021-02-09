import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  listQuestions;

  public totalRecords:number;
  public page: number=0;
  public size: 20;
  pages:Array<number>;

  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService) {
     
   }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(){
    let url = this.service.host+"questions?page="+this.page+"&size="+this.size;
    this.service.getRessource(url).
    subscribe(data =>{
     this.listQuestions = data;
     this.totalRecords = data["page"].totalPages;
     this.pages = new Array<number>(this.totalRecords);
   },err =>{console.log(err)})
  }

  goTo(i){
    this.page=0;
    this.page = i;
    this.getQuestions();
    
  }
}
