import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { tap, catchError, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorgeService } from './storage/storge.service';
import { AlertService } from './alert/alert.service';


//let apiUrl = "http://localhost:8000/";
let apiUrl = "https://iflex.ng/car-parking-api/";
//let apiUrl = "https://smni.webdevelopmentcompanyusa.com/expository_session.php/";
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
 
  result: any;



  constructor(
    public http: HttpClient,  
    private router: Router,
    private stroageServices: StorgeService, 
    public alert: AlertService,
  ) { }

  
  postData(credentials, type) {
    return new Promise((resolve, reject) => {
     let Headers = new HttpHeaders();

      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: Headers})
      .subscribe(res => {
        resolve(res);
        
      },   (err) => {
        reject(err);
        
      });
    });

  }

/*
  thirdParty(url , credentials) {
     
    return new Promise((resolve, reject) => {
     let Headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAAZIavVtI:APA91bFwSsM8fZhlVZJ_fdhcws9DE0nmZ9JoC1uChgREdl5SqUwScJeslm3V-5aQVt91o4uUgqoqDARbVpJhytgyI9al1ChY38mY1aDJHZcNDDHuWSjZaLpHbvymPnnTY2eHiNQzj6Xf',
      });
      
      this.http.post(url, JSON.stringify(credentials), {headers: Headers})
      .subscribe(res => {
        resolve(res);
        
      },   (err) => {
        reject(err);
        
      });
    });

  }
*/


  // new JWT token
  
  login(user){
    console.log("api hiitt");

    let Headers = new HttpHeaders({});
    return new Promise((resolve, reject) => {

     return this.http.post(apiUrl + 'login', JSON.stringify(user), {headers: Headers})
    .subscribe(res => { 
      
      this.result = res; 

      if(this.result.userData){
        this.doLoginUser(user.username, res)
        this.router.navigateByUrl('/dashboard');
        this.alert.notification('Login Sucessfull', 'success');
      }else{
        this.alert.notification(this.result.error.text, 'danger');
      }


    },   (err) => { 
      reject(err);
      
    });
  });  

  }


   
 


 

  logout() {
    this.stroageServices.clear();
    localStorage.clear();
    this.router.navigateByUrl('/login'); 
  }
 
  isLoggedIn() {
    return !!this.getJwtToken();
    
  }

  refreshToken() {
    return this.http.post<any>(apiUrl + 'refresh_token', {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: any) => {
      if(tokens){
        this.storeJwtToken(tokens.userData.jwt);
        console.log(tokens);
      }else{
        console.log("token expired");
      }

      
      
    }
    ));
  }

  getJwtToken() { 
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens:any) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

   
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
  

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
  
  private storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens.userData.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.userData.refresh_token);
    this.stroageServices.store('userData1', tokens.userData);
     
  }




  post_upload(credentials, url) {
    return new Promise((resolve, reject) => {
     let Headers = new HttpHeaders();

      this.http.post(apiUrl + url, credentials, {headers: Headers})
      .subscribe(res => {
        resolve(res);
        
      },   (err) => {
        reject(err);
        
      });
    });

  }
 




}
