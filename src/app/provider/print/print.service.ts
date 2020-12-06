import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';
import {AlertService} from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(
    public btSerial:BluetoothSerial,
    public toastController: ToastController,
    public alertService: AlertService
    ) { }

  searchBluetoothPrinter()
{
//This will return a list of bluetooth devices
   return this.btSerial.list(); 
}
connectToBluetoothPrinter(macAddress)
{
  
   return this.btSerial.connect(macAddress)
}
disconnectBluetoothPrinter()
{
//This will disconnect the current bluetooth connection
   return this.btSerial.disconnect();
}
//macAddress->the device's mac address 
//data_string-> string to be printer
sendToBluetoothPrinter(macAddress,data_string)
{
   //1. Try connecting to bluetooth printer
   this.connectToBluetoothPrinter(macAddress)
   .subscribe(_=>{
      //2. Connected successfully
      this.btSerial.write(data_string)
      .then( _=>{
        console.log('Print successful.');
        this.alertService.notification("Print successful", "danger");
    
       //3. Print successful
       //If you want to tell user print is successful,
       //handle it here
       //4. IMPORTANT! Disconnect bluetooth after printing
       this.disconnectBluetoothPrinter()
       },err=>{
          console.log('there is an error printing to bluetooth printer');
          this.alertService.notification("there is an error printing to bluetooth printer", "danger");
 
        
         //If there is an error printing to bluetooth printer
         //handle it here
       })
   },err=>{
    this.alertService.notification("there is an error connecting to bluetooth printer", "danger");
     //If there is an error connecting to bluetooth printer
     //handle it here
   })
}





}
