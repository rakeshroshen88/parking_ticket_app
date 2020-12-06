import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './provider/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestpageComponent } from './pages/testpage/testpage.component';
import { ArchwizardModule } from 'angular-archwizard';
import { DatePipe } from '@angular/common';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';    
import { IonicStorageModule } from '@ionic/storage';   
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';



@NgModule({
  declarations: [AppComponent, TestpageComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule,
    ArchwizardModule,
    IonicStorageModule.forRoot(),
    NgxQRCodeModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DatePipe,
    Camera,
    File,
    WebView,
    FilePath, 
    NavParams, 
    BarcodeScanner,
    BluetoothSerial,
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
