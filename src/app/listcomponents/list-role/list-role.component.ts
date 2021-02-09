import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {

  listRole;

  constructor(private service: MyGescoService) { }

  ngOnInit(): void {
    this.getRole();
  }

  getRole(){
    this.service.getRole()
    .subscribe(data =>{
      this.listRole=data;
    },err=>{
      console.log(err);
    })
  }
}
