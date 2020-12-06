import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/provider/alert/alert.service';
import { AuthService } from 'src/app/provider/auth.service';
import { StorgeService } from 'src/app/provider/storage/storge.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData = {};
  resposeData: any; 
  userdetails: any;
  constructor(
    public authService: AuthService, 
    private stroageServices: StorgeService, 
    private router: Router,  
    public alert: AlertService,
    //public checkuserservice: CheckUserService

  ) { }

  ngOnInit() {
    this.user_details();
  }

  
  user_details(){  
    this.authService.postData(this.userData, "user_details").then(async (result) =>{
      this.resposeData = result;
      if(this.resposeData.order_detail){
        this.userdetails = this.resposeData.order_detail;
      } 
        
    }, (err) => {
      this.alert.notification("No Internet Connection ", "danger"); 
    });
  }


  logout(){
    this.authService.logout();
  }

}