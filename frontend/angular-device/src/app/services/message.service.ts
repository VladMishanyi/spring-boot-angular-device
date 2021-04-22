import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {TableModelMB110_1TD} from "../objects/objectsSourse";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject<string>();
  private dateSource = new Subject<any>();
  private listOfTable = new Subject<TableModelMB110_1TD[]>();
  public messageStream$ = this.messageSource.asObservable();
  public dateStream$ = this.dateSource.asObservable();
  public listOfTable$ = this.listOfTable.asObservable();

  constructor() {}

  newMessage(message: string): void {
    this.messageSource.next(message);
}

  newDate(date: any): void {
    this.dateSource.next(date);
  }

  newListOfTable(list: any): void{
    this.listOfTable.next(list);
  }
}
