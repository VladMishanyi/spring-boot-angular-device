import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject<string>();
  private dateSource = new Subject<any>();
  public messageStream$ = this.messageSource.asObservable();
  public dateStream$ = this.dateSource.asObservable();

  constructor() { }

  newMessage(message: string): void {
    this.messageSource.next(message);
}

  newDate(date: any): void {
    this.dateSource.next(date);
  }
}
