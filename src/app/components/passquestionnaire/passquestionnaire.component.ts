import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-passquestionnaire',
  templateUrl: './passquestionnaire.component.html',
  styleUrls: ['./passquestionnaire.component.css']
})
export class PassquestionnaireComponent implements OnInit {

  listQuestions;

  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  getQuestions(com){
    this.service.getQuestions(com)
    .subscribe(data =>{
     this.listQuestions = data;
   },err =>{console.log(err)})
  }
}
