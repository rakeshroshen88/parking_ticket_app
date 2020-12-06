import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { isTabSwitch } from '@ionic/angular/directives/navigation/stack-utils';
import { Router } from '@angular/router';
import { AuthService } from './provider/auth.service';
import { StorgeService } from './provider/storage/storge.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  userData = {"isAccpeted" : "", "delivery_order_id" : ""};
  resposeData: any; 
  userdetails: any;
  
  splacehide =  true;
  @ViewChild('splash', {static:false})splash:ElementRef;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'mail'
    },
    {
      title: 'barcode',
      url: '/barcode-generator',
      icon: 'mail'
    } 
  ];
   

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService, 
    private stroageServices: StorgeService, 
    private router: Router,  
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      
      this.statusBar.backgroundColorByHexString('000089');
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      // custom splash hide
     setTimeout(() => {
        this.splacehide = false;
        this.splash.nativeElement.style.display = 'none';
      }, 3000); 
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.gettingallAssign_orders();
  }

  logout(){
    this.authService.logout();
  }


  gettingallAssign_orders(){  
    this.authService.postData(this.userData, "user_details").then(async (result) =>{
      this.resposeData = result;
      if(this.resposeData.order_detail){
        this.userdetails = this.resposeData.order_detail;
      } 
        
    }, (err) => {
      //this.alert.notification("No Internet Connection ", "danger"); 
    });
  }


}
