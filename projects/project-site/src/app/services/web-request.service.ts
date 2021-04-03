import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL:String = 'http://'+'localhost'+':'+'3000';

  constructor(private http:HttpClient) { }

  getAdress(uri:String){
    return `${this.ROOT_URL}${uri}`;
  }

  get(uri:String){
    return this.http.get(this.getAdress(uri));
  }

  delete(uri:String){
    return this.http.delete(this.getAdress(uri));
  }

  post(uri:String, payload:Object){
    return this.http.post(this.getAdress(uri), payload);
  }

  post3(uri:String, payload:Object, options:Object){
    return this.http.post(this.getAdress(uri), payload, options);
  }

  patch(uri:String, payload:Object){
    return this.http.patch(this.getAdress(uri), payload);
  }
}
