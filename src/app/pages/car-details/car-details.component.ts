import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertService } from 'src/app/provider/alert/alert.service';
import { AuthService } from 'src/app/provider/auth.service';
import { StorgeService } from 'src/app/provider/storage/storge.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarDetailsComponent implements OnInit {

  userData = {"car_number" : ""};
  qrData = "";
  createdCode = null;
  scannedCode = null;
  electmentType : 'url' | 'canvas' | 'img' = 'canvas';
  resposeData: any;
  userdetails:any;
  resposeData1: any;
  constructor(
    public authService: AuthService, 
    private stroageServices: StorgeService, 
    private router: Router,  
    public alert: AlertService,
    private barcodeScanner: BarcodeScanner,
    private actiatedRoute:ActivatedRoute,
    public location :Location
    
  ) {

    let car_number = this.actiatedRoute.snapshot.paramMap.get('id');
    this.userData.car_number = car_number;
    this.createdCode = car_number;
   }

  ngOnInit() {
    this.createCode();
  }

  createCode() { 
    this.authService.postData(this.userData, "get_car_details").then(async (result) =>{
      this.resposeData = result;
      if(this.resposeData.car_details){
        this.userdetails = this.resposeData.car_details;

        


      }else{
        this.alert.notification(this.resposeData.error.text, "danger"); 
      }
        
    }, (err) => {
      this.alert.notification("No Internet Connection ", "danger"); 
    });


    
    console.log(this.createdCode);

  }


  

  CloseModal(){ 
    this.location.back();
  }


  exit_car() { 
    this.authService.postData(this.userData, "exit_car").then(async (result) =>{
      this.resposeData1 = result;
      if(this.resposeData1.car_status){ 
        this.alert.notification(this.resposeData1.car_status.text, "success"); 

      }else{
        this.alert.notification(this.resposeData1.error.text, "danger"); 
      }
        
    }, (err) => {
      this.alert.notification("No Internet Connection ", "danger"); 
    });


    
    console.log(this.createdCode);

  }



}
