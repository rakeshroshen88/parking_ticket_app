import { Injectable } from '@angular/core';
import {Plugins, Storage} from '@capacitor/core'

@Injectable({
  providedIn: 'root'
})
export class StorgeService {

  

  constructor() { }
  async store(storageKey:string, Value:any){
    const encryptedValue =btoa(escape(JSON.stringify(Value)));
    await Storage.set({
      key:storageKey,
      value:encryptedValue
    })
  }

  async get(storageKey:string){
    //console.log(storageKey);
    const res = await Storage.get({key:storageKey});
    //console.log(res);
    if(res.value){
     return JSON.parse(unescape(atob(res.value)));
     
    }else{
      return false
    }
     
  }

  async removeItem(storageKey:string){
    await Storage.remove({key:storageKey})
  }

  async clear(){
    await Storage.clear();
  }
  
  
}
