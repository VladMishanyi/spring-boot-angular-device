import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject<string>();
  messageStream$ = this.messageSource.asObservable();

  constructor() { }

  newMessage(message: string) {
    this.messageSource.next(message);
}
}
