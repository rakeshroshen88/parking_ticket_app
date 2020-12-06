import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservices: AuthService, private router:Router ){
    
  }

  canActivate(){
      //console.log(this.authservices.isLoggedIn());
      if(!this.authservices.isLoggedIn()){
        this.router.navigate(['/login']);
      }else{
        return true
      }
      //return this.authservices.isLoggedIn();
      
    
  }
  
}
