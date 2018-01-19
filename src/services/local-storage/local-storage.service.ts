import { Injectable } from '@angular/core';
import { log } from 'util';

@Injectable()
export class LocalStorageService {

  constructor() { }
  setLocalStore(key, data) {
    return localStorage.setItem(key, typeof data == 'object' ? JSON.stringify(data) : data);
  }

  getLocalStore(key) {
    return localStorage.getItem(key);
  }

  clearStorageFor(key) {
    return localStorage.remove(key);
  }

  clearStorage() {
    return localStorage.clear();
  }
  getToken() {
    return this.getLocalStore("LoggedinUser")["secretToken"];
  }
}
