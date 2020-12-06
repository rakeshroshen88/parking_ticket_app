import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import {ModalController,  NavParams, ToastController, Platform, ActionSheetController, LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/provider/alert/alert.service';
import { AuthService } from 'src/app/provider/auth.service';
import { WebView } from '@ionic-native/ionic-webview/ngx'; 
import { File, FileEntry } from '@ionic-native/File/ngx';    
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Storage } from '@ionic/storage'; 
import { Location } from '@angular/common';

const STORAGE_KEY = 'my_images';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'], 
})
export class EditProfileComponent implements OnInit {

  
  newprofiledetails: any; 
  userData = {"user_id":""}
  userdeatils: any;
  userDetails111 = { 
  "image_id": "",   
  
  "address": "",
  "website": "",  
  "zip_code": "",
  "state": "",
  "city_id": "", 
  "country_id": "",  
  "dob": "",
  "mobile_no": "",
  "gender": "",  
  "first_name": "",
  "last_name": "",
  "ac_number": "",
  "ac_name": "",
  "bank_name": ""}
  filedetails: any;
  selectedFile: any;
  imagePath: any;
  imgURL: any;
  
  


  //// new image upload and caputer


  images = [];
  picTaken: any;
  blobAttachs: any;
  attachments: any;
  resposeData: any;
 

  constructor(
    private ModalController :ModalController, 
    //public authService : AuthServiceService, 
    private navParams: NavParams,
    public toastController: ToastController, 
    //private stroageServices: StorageService,
    public authService: AuthService, 
    public router: Router ,
    private datepipe :DatePipe,
    public alert:AlertService,
    private http: HttpClient,

    private platform: Platform,  
    private file: File, 
    private webview: WebView,
    private actionSheetController: ActionSheetController, 
    private storage: Storage,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef, 
    private filePath: FilePath,
    private camera: Camera,
    public location :Location
    
    ) { 
      
      
      
    }

  ngOnInit() {
    this.user_details();
  }
 

  user_details(){  
    this.authService.postData(this.userData, "user_details").then(async (result) =>{
      this.resposeData = result;
      if(this.resposeData.order_detail){
        this.userDetails111 = this.resposeData.order_detail;
      } 
        
    }, (err) => {
      this.alert.notification("No Internet Connection ", "danger"); 
    });
  }

  updateprofile(){
    let latest_date =this.datepipe.transform(this.userDetails111.dob, 'yyyy-MM-dd');
    this.userDetails111.dob = latest_date; 
    this.authService.postData(this.userDetails111, "updateuserdetails").then(async (result) =>{
      this.newprofiledetails = result;
      if(this.newprofiledetails.success){
        //this.onUpload();
        this.alert.notification( this.newprofiledetails.success.text, "success")
        this.CloseModal(); 
      }else{
        this.alert.notification(this.newprofiledetails.error.text, "danger")
      } 
        

    }, (err) => {
      this.alert.notification("No Internet Connection ", "danger");
    });
  }


  ////////////////////////////////////////////////////
 

//// upload code direct 

  onFileChanged(event) {
    this.filedetails = event.target.files;
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();
    this.imagePath = this.filedetails;
    reader.readAsDataURL(this.filedetails[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    
     

  }

  onUpload() {

    const uploadData = new FormData();
    uploadData.append('myphoto', this.selectedFile, this.selectedFile.name);   
    this.http.post('https://iflex.ng/smni-api/upload.php/upload_profile', uploadData)
      .subscribe(res => {
        console.log(res); // handle event here
      });
 

     
  }  

  CloseModal(){ 
    this.location.back();
  }




  ////// new upload and capute image 
  // capture photo


  
  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
    });
  }
 
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
 
  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }

  async selectImage() {
    console.log("clickwd");
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
}
 
takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
 
    this.camera.getPicture(options).then(imagePath => {
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
                .then(filePath => {
                    let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                     
                });
        } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
    });
 
}



createFileName() {
  var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
  return newFileName;
}

copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
    this.updateStoredImages(newFileName);
}, error => {
    this.presentToast('Error while storing file.');
});
   
}

updateStoredImages(name) {
  let filePath = this.file.dataDirectory + name;
  let resPath = this.pathForImage(filePath);

  let newEntry = {
      name: name,
      path: resPath,
      filePath: filePath
  };

  this.images = [newEntry, ...this.images];
  this.startUpload(newEntry)
  this.ref.detectChanges(); // trigger change detection cycle
} 

startUpload(imgEntry) {
  console.log(imgEntry);
  this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
          ( < FileEntry > entry).file(file => this.readFile(file))
      })
      .catch(err => {
          this.presentToast('Error while reading file.');
      });
}

readFile(file: any) {
  const reader = new FileReader();
  reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
          type: file.type
      });
      formData.append('myphoto', imgBlob, file.name); 
      this.uploadImageData(formData, file);
     
      
  };
  reader.readAsArrayBuffer(file);
}

async uploadImageData(formData: FormData, file) {
   
  this.http.post("https://iflex.ng/smni-api/upload.php/upload_profile", formData).subscribe(res => {
          if (res['success']) {
             
              //this.presentToast('File upload complete.')
              this.profileimg(file.name);
          } 
      });
}


//// sending post data in sql


profileimg(imgName?:string){ 
  this.userDetails111.image_id = imgName;

} 

 


}
