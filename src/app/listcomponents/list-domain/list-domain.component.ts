import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomaineComponent } from 'src/app/components/domaine/domaine.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-domain',
  templateUrl: './list-domain.component.html',
  styleUrls: ['./list-domain.component.css']
})
export class ListDomainComponent implements OnInit {

  public listDomaine;

  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getDomaine();
  }
  getDomaine(){
    this.service.getDomaines().subscribe(data =>{
      this.listDomaine = data;
    },err =>{console.log(err)})
   }

   oncreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose= true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.matDialog.open(DomaineComponent,dialogConfig);
  }
  deletDomainName(id: number){
    if(confirm("Vous êtes sûr de le supprimer ?"))
   this.service.deletDomaines(id)
   .subscribe(data =>{
    this.getDomaine();
     this.toastrService.warning('Suppression réussi !', 'MyGesco APPLI, Supprimer');  
   },err =>{console.log(err)})
  }

}
