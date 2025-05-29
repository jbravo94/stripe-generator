import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private prefix = "stripe-generator-";

  constructor() { }

  getValueForKeyOrDefault(key: string, defaultValue: any) {
    return localStorage.getItem(this.prefix + key) || defaultValue;
  }

  setValueForKey(key: string, value: string) {
    localStorage.setItem(this.prefix + key, value);
  }

}
