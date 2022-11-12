import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage;

  constructor() { this.storage = window.localStorage; }
  
  setData(key: string, data: any) : boolean  {
    if (this.storage) {  
        this.storage.setItem(key,JSON.stringify(data));
      return true;
    }
    return false;
  }
  
  get(): any {
    console.log(this.storage)
    let data =""
    if (this.storage) {
      if(this.storage.length>0)   {
        data = JSON.parse(this.storage.getItem('token')||"")
      }
    
      return data ;
    
    }
    return null;
  }
  
  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

 
}
