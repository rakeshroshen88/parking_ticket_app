import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { AlertService } from 'src/app/provider/alert/alert.service';
import { AuthService } from 'src/app/provider/auth.service';
import { StorgeService } from 'src/app/provider/storage/storge.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { BarcodeGeneratorPage } from '../barcode-generator/barcode-generator.page';
import { PrintService } from 'src/app/provider/print/print.service';

declare let BTPrinter: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  

  qrData : any;
  createdCode = null;
  scannedCode = null;
  electmentType : 'img'; 

  selectedPrinter:any; 

  userData = {"car_number" : ""};
  resposeData: any; 
  userdetails: any;
  result22: any;


  constructor(
    public authService: AuthService, 
    private stroageServices: StorgeService, 
    private router: Router,  
    public alert: AlertService,
    private barcodeScanner: BarcodeScanner,
    public modalController: ModalController,
    //public checkuserservice: CheckUserService
    private print:PrintService,

  ) { }

  ngOnInit() {
    this.gettingallAssign_orders();
  }

  
  gettingallAssign_orders(){  

    
  }


  logout(){
    this.authService.logout();
  }


  
 
 

  createCode() {
    
    
   
    this.userData.car_number = this.qrData;
    this.authService.postData(this.userData, "enter_new_car").then(async (result) =>{
      this.resposeData = result;
      if(this.resposeData.car_details){
        this.userdetails = this.resposeData.car_details;
        console.log(this.userdetails);
        this.alert.notification("Car has been carked", "success"); 
        
        // generating QR Code
        this.createdCode = this.qrData;

      }else{
        this.alert.notification(this.resposeData.error.text, "danger"); 
      }
        
    }, (err) => {
      this.alert.notification("No Internet Connection ", "danger"); 
    });


  }

  scanCode () {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.userData.car_number = barcodeData.text;
    })
  
    this.authService.postData(this.userData, "get_car_details").then(async (result) =>{
      this.resposeData = result;
      if(this.resposeData.car_details){
        this.userdetails = this.resposeData.car_details; 
        this.router.navigateByUrl('/dashboard/car-details/'+ this.userdetails.car_number);

      }else{
        this.alert.notification(this.resposeData.error.text, "danger"); 
      }
        
    }, (err) => {
      this.alert.notification("No Internet Connection ", "danger"); 
    });



  }


  async find_blutooth(){
    const modal = await this.modalController.create({
      component: BarcodeGeneratorPage,
      cssClass: 'findblue-tooth'
    });

    modal.onDidDismiss().then(data=>{
      console.log('data came back from modal');
      console.log(data);
      this.selectedPrinter = data.data;


    });

    return await modal.present();
    
  }



  async printStuff(parent){  
    const barcode =  parent.qrcElement.nativeElement.querySelector("img").src;  
    console.log(barcode);

    var savhed  = await this.saveAsImage(parent, this.userdetails.id); 
    console.log(savhed);
    
     
    var printData = 'http://iflex.ng/car-parking-api/img/logo-small.jpg';
        printData += barcode;
        printData += "\n\n\n";
        printData += 'IBOM Christmas Celebration'; 
        printData += "\n\n\n";
        printData += 'Car No: ';
        printData += this.userdetails.car_number;
        printData += "\n\n\n";
        printData += 'Time In: ';
        printData += this.userdetails.time_in; 
        printData += 'Thank you and drive Safaly ';
        printData += "\n\n\n";


    /*
   //The text that you want to print
   var printData = '<div style="text-align: center;"><div><img style="max-width: 150px;" src="';
   printData += 'http://iflex.ng/car-parking-api/img/logo-small.jpg';
   printData += '"><h3>IBOM Christmas Celebration</h3><h5>'; 
   printData += 'Car No: ';
   printData += this.userdetails.car_number;
   printData += '</h5><h6 style="border-top: 3px dotted #ccc;border-bottom: 3px dotted #ccc;  padding: 15px; text-transform: uppercase; font-weight: bold; font-size: 14px;">Parking Receipt</h6><h3>';
   printData += this.userdetails.time_in; 
   printData += '</h3><p>Charges:';
   printData += '₦00.00';
   printData += '</p><p style="border-top: 3px dotted #ccc;border-bottom: 3px dotted #ccc;  padding: 15px; text-transform: uppercase; font-weight: bold; font-size: 14px;">Status:';
   printData += this.userdetails.status;
   printData += '</p></div><div><p>Thank you and drive Safaly</p><div>';
   printData += '<ngx-qrcode style="width: 100%;"><div><img src="';
   printData += 'http://iflex.ng/car-parking-api/img/' + savhed;
   printData += '"></div></ngx-qrcode></div></div></div>';
   printData += "\n\n\n";
 */

    // var myText="Hello hello hello \n\n\n This is a test \n\n\n";
   await this.print.sendToBluetoothPrinter(this.selectedPrinter,printData);

  
   
} 



saveAsImage(parent, carId) { 
  const parentElement =  parent.qrcElement.nativeElement.querySelector("img").src;  

  // converts base 64 encoded image to blobData
  let blobData = this.convertBase64ToBlob(parentElement);

  return this.readFile(blobData, '0' , this.createFileName(), carId);


/*

  // saves as image
  if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
    window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
  } else {  
    const blob = new Blob([blobData], { type: "image/png" });
    const url = window.URL.createObjectURL(blob);
     
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Qrcode';
    link.click();
  }
  */

}

private convertBase64ToBlob(Base64Image: any) {
  // SPLIT INTO TWO PARTS
  const parts = Base64Image.split(';base64,');
  // HOLD THE CONTENT TYPE
  const imageType = parts[0].split(':')[1];
  // DECODE BASE64 STRING
  const decodedData = window.atob(parts[1]);
  // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
  const uInt8Array = new Uint8Array(decodedData.length);
  // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }
  // RETURN BLOB IMAGE AFTER CONVERSION
  return new Blob([uInt8Array], { type: imageType });

}


createFileName() {
  var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
      return newFileName;
}



readFile(file: any, UserIDG:any, newFileName, carId) {
  const reader = new FileReader();

  
  reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
          type: file.type
      });
      formData.append('file', imgBlob, newFileName);
      formData.append('user_id', UserIDG); 
      formData.append('carId', carId);
      return this.uploadImageData(formData, file);
     
      
  };
  reader.readAsArrayBuffer(file);
}

async uploadImageData(formData: FormData, file) {
    console.log(formData);

  this.authService.post_upload(formData, "upload.php/signup_profile_upload").then(async (result) =>{
    this.result22 = result;
    if(this.result22.qr_code_path){
      console.log(this.result22.qr_code_path);
      return this.result22.qr_code_path;
    }
   

  });

}


}
