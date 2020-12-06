import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import {PrintService} from '../../provider/print/print.service'


@Component({
  selector: 'app-barcode-generator',
  templateUrl: './barcode-generator.page.html',
  styleUrls: ['./barcode-generator.page.scss'],
})
export class BarcodeGeneratorPage implements OnInit {

  qrData = "";
  createdCode = null;
  scannedCode = null;
  electmentType : 'url' | 'canvas' | 'img' = 'canvas';


  metin;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;



  constructor(
    private barcodeScanner: BarcodeScanner, 
    private bluetoothSerial: BluetoothSerial, 
    private alertCtrl: AlertController,
    private barkodScanner: BarcodeScanner,
    private print:PrintService,
    public modalController: ModalController
    ) { 

      bluetoothSerial.enable();

    }

  ngOnInit() {
  }

  createCode () {
    this.createdCode = this.qrData;
    console.log(this.createdCode);
  }

  scanCode () {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    })
  }


  bluetoothList:any=[];
  selectedPrinter:any; 

    //This will list all of your bluetooth devices
    listPrinter() { 
      this.print.searchBluetoothPrinter()
       .then(resp=>{
   
        //List of bluetooth device list
        this.bluetoothList=resp;
    });
}
//This will store selected bluetooth device mac address
selectPrinter(macAddress)
{
  //Selected printer macAddress stored here
  this.selectedPrinter=macAddress;


  ///close popup

  this.modalController.dismiss(macAddress);


}

//This will print
printStuff()
{  
   //The text that you want to print
  var printData;
   printData += "<table><tr><th>No</th> <th>Item</th> <th>Price</th></tr></table>";
   printData += "<tr><td>1</td> <td>Dhoti Lungi Pagiti big name</td> <td>150</td></tr>";
   printData += "<tr><td>1</td> <td>Dhoti </td> <td>250</td></tr>";
   printData += "</table>";
   printData += "\n\n\n";


    // var myText="Hello hello hello \n\n\n This is a test \n\n\n";
   this.print.sendToBluetoothPrinter(this.selectedPrinter,printData);
   
} 


  /*

  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
      });
    },
      (err) => {
        console.log(err);
      })

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {

      })
  }
  success = (data) => alert(data);
  fail = (error) => alert(error);
 
  async selectDevice(address: any) {
    const alert = await this.alertCtrl.create({ 
      header: 'Connect!',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
            // this.bluetoothSerial.connect(address).subscribe(data => {
            //   this.yazdir()
            // });

          }
        }
      ]
    });

    await alert.present();
  }

  async disconnect() {
    const alert = await this.alertCtrl.create({ 
      header: 'Disconnect!',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });

    await alert.present();
  }
  

 
 
  yazdir() {
 
    let dataX = "aaaa";
    this.bluetoothSerial.write(this.metin).then(data => {
      console.log(data);
    });


  }
 */

dismiss(){
  this.modalController.dismiss();
}

}
