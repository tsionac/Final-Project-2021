import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateRequestService {

  constructor() { }

  getCurrentTime():Date {
    return new Date();
  }
}
