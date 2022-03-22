import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: any): boolean {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
  }

  get(key: string): any {
    const item = this.storage.getItem(key)
    if(item===null){
        return null;
    }
    return JSON.parse(item);
  }

  remove(key: string): boolean {
      this.storage.removeItem(key);
      return true;
  }

  clear(): boolean {
      this.storage.clear();
      return true;
  }

}