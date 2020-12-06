import { Injectable } from '@angular/core'; 
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';


 
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  errotext:any;



  constructor(public authService: AuthService) { }
 

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }
    

    return next.handle(request).pipe(catchError(error => { 
      this.errotext = error.error.text; 
      this.errotext =this.errotext.trim(); 
      if((error instanceof HttpErrorResponse && error.status === 401) || (error instanceof HttpErrorResponse && this.errotext =="Expired token") ){
        return this.handle401Error(request, next);
      }else{
        return throwError(error);
      }
      

    }));
    
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
  
      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.userData.jwt);
          return next.handle(this.addToken(request, token.userData.jwt));
        }));
  
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          console.log(jwt);
          return next.handle(this.addToken(request, jwt));
        }));
    }
  
}
}
