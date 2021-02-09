import { Component, OnInit } from '@angular/core';
import { Domaine } from 'src/app/share/domaine.model';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-domaine',
  templateUrl: './domaine.component.html',
  styleUrls: ['./domaine.component.css']
})
export class DomaineComponent implements OnInit {

  domain: Domaine=new Domaine();
  listDomaine: Object;
  constructor(private service: MyGescoService, private dialogRef: MatDialogRef<DomaineComponent>, 
  private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
  }
  createDomain(){
    this.service.createDomain(this.domain).subscribe(data =>{
      this.toastrService.success('Nom de domain crée avec success !', 'MyGesco APPli, Création !');
      this.domain = new Domaine();
    })
  }
}
