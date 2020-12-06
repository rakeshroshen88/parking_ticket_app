import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  message1:any;

  constructor(public alertController:AlertController, public loadingController: LoadingController,public toastController: ToastController) { }
  
  async presentAlertConfirm(header:string, message:string) {
    let choice;
      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            
          }, {
            text: 'Okay',
            role: 'okay',
            handler: () => {
              console.log('Confirm Okay');
              return;
            }
            
          }
        ]
      });
  
      await alert.present();
  await alert.onDidDismiss().then(data=>{
    choice=data;
  });
  return choice;
    }

 

    //// loader 

  async presentLoading(loadingMsg?:any) {
    if(loadingMsg){
      this.message1 =  loadingMsg;
    }else{
      this.message1 =  'Please wait...'
    }

    const loading = await this.loadingController.create({
      spinner: "circular",
      message: this.message1,  
      duration: 3000,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();

  }


  async presentLoading_notime(loadingMsg?:any) {
    if(loadingMsg){
      this.message1 =  loadingMsg;
    }else{
      this.message1 =  'Please wait...'
    }

    const loading = await this.loadingController.create({
      spinner: "circular",
      message: this.message1,  
      duration: 6000, 
      translucent: true, 
    });
    return await loading.present();

  }


  async dismissLoading() { 
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }


  //toastController
  async notification(message:string, type:string ) {
  const toast = await this.toastController.create({ 
    message: message,
    duration: 1000,
    color: type,
    
    
  });
  toast.present();
}



}
