import { Component, OnInit } from '@angular/core';
import { MyGescoService } from 'src/app/share/my-gesco.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //showNav: boolean = true;

  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService,
    private router: Router, private authServive: AuthenticationService) { }

    ngOnInit(): void {
  
    }

  //gotoComponent(){
  // this.router.navigateByUrl('/listeoperateur');
 // }
 
// onLogin(f){
 //  this.authServive.login(f.username, f.password);
  // if(this.authServive.isAuthenticated){
 //    this.router.navigateByUrl("/listquestionnaire");
 //  }
// }

onLogin(f){
  this.authServive.authenticate(f).subscribe(data =>{
    let jwt = data.headers.get('Authorization');
   // console.log(jwt)
    this.authServive.saveToken(jwt);
    this.router.navigateByUrl("/");
  },err =>{console.log(err)})
 }
 

 loadToken(){
   this.authServive.loadToken();
 }
}
