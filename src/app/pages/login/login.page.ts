import { Component, OnInit, ViewEncapsulation } from '@angular/core'; 
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/provider/auth.service';
import { AlertService } from 'src/app/provider/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData = {"email_id":"", "password":"" } 
  signup_data = {
    "first_name": "",
    "last_name": "",
    "country": "160",
    "country_code": "234", 
    "password": "", 
    "mobile_no": "", 
    "email_id": "",
    "confirmPassword": ""
    /*
    "state": "",
    "confirmPassword": "",
    "email_id": "",
    "dataofbirth": "",
    "gender": "",
    "user_status": "0",
    "uniqueid": ""*/
  } 
  resposeData: any;
  data_user_login: any;

  constructor(
    public authService: AuthService, 
    //private stroageServices: StorageService,
    public toastController: ToastController,
    private router: Router,  
    public alert: AlertService,

  ) { 
   // this.checkIfUserlogin_already_loggedIn();
  }

  ngOnInit() {
    
  }

  login(){  
    this.authService.login(this.userData);
  }
  /*
  checkIfUserlogin_already_loggedIn(){
    console.log("new data ")
    this.stroageServices.get("userData1").then((result) => {
      this.data_user_login = result; 
      if (this.data_user_login.userData) { 
         this.userData.usertype = this.data_user_login.userData.usertype; 
         // check if user is valid type
        if(this.userData.usertype == 'driver'){ 
           this.router.navigateByUrl('/dashboard');
        } 


        
      } else {
        this.router.navigateByUrl('/login');

      }
 

    }); 
 
  }*/


  signup(){
    //console.log(this.signup_data);
    this.alert.presentLoading_notime("Please wait !! Your are being registered");
    this.authService.postData(this.signup_data, "signup").then(async (result) =>{
      this.resposeData = result;
      if(this.resposeData.userData){
        //this.userdetails = this.resposeData.order_detail;

        this.resposeData.userData;
        this.alert.notification('You are Sucessfully Register!! Login Now', 'success');
        this.router.navigateByUrl('/dashboard');
      }else{
        this.alert.notification(this.resposeData.error.text, 'danger');
      }
        
    }, (err) => {
      this.alert.notification("No Internet Connection ", "danger"); 
    });


  }

}
