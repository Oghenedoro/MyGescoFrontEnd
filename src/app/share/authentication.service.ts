import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

jwt: string;
username: string;
roles: Array<string>;  

host: string= "http://localhost:8888";
public isAuthenticated: boolean;
public userAuthenticated;

private users=[
  {username:"user1", password:"user","roles":["USER"]},
  {username:"user2", password:"user","roles":["USER"]},
  {username:"admin", password:"admin","roles":["ADMIN","USER"]}
]
constructor(private http: HttpClient) { }

 login(userN:string, passw:string){
  let user;
  this.users.forEach(u =>{
    if(userN==u.username && passw==u.password){
      user=u;
    }
  });
  if(user){
    this.isAuthenticated=true;
    this.userAuthenticated =user;
  }else{
    this.isAuthenticated=false;
    this.userAuthenticated=undefined;
  }
 }

 //public isAdmin(){
   //if(this.userAuthenticated){
     //if(this.userAuthenticated.roles.indexOf('ADMIN')> -1)
       //return true;
     //}
    // return false;
  // }

   authenticate(data){
    return this.http.post(this.host+"/authenticate",data,{observe:'response'})
   }

   saveToken(jwt: string){
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJwt();
   }

   parseJwt(){
     //npm install @auth0/angular-jwt to get the service
    let jwtHelper = new JwtHelperService();
    let objJwt = jwtHelper.decodeToken(this.jwt);
    if(objJwt){
    this.username = objJwt.obj;
    this.roles = objJwt.roles;
    }
  }
   public isOtRole(){
    if(this.roles){
    return this.roles.indexOf('OT') > -1;
    }
   }
   public isOARole(){
    if(this.roles){
    return this.roles.indexOf('OA') > -1;
   }
  }
   public isAdminRole(){
     if(this.roles){
    return this.roles.indexOf('ADMIN') > -1;
   }
  }
   isUserAuthenticated(){
    return this.roles && (this.isOtRole || this.isOARole);
  }
  loadToken(){
    this.jwt = localStorage.getItem('token');
    this.parseJwt();
  }

  logout(){
    localStorage.removeItem('token');
    this.initParams();
  }

  initParams(){
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }
 }

