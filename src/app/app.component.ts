import { Component } from '@angular/core';
import { MyGescoService } from './share/my-gesco.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from './share/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myGescoV2';
  constructor(private service: MyGescoService,private matDialog: MatDialog,private toastrService: ToastrService,
    private router: Router, public authService: AuthenticationService) { }


    isOT(){
      return this.authService.isOtRole();
    }
    isOa(){
     return this.authService.isOARole();
   }
   
   isAdminRole(){
     return this.authService.isAdminRole();
   }
    isAuthenticated(){
      return this.authService.isUserAuthenticated();
    }
   
    logout(){
      this.authService.logout();
    }
}
 
