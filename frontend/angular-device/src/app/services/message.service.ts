import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {DeviceModelMB110_1TD, TableModelMB110_1TD} from "../objects/objectsSourse";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject<string>();
  private dateSource = new Subject<any>();
  private listOfTable = new Subject<TableModelMB110_1TD[]>();
  private modbusDevice = new Subject<DeviceModelMB110_1TD>();
  private timerStatus = new Subject<boolean>();
  private contactStatus = new Subject<boolean>();
  private textStatus = new Subject<string>();


  public messageStream$ = this.messageSource.asObservable();
  public dateStream$ = this.dateSource.asObservable();
  public listOfTable$ = this.listOfTable.asObservable();
  public modbusDevice$ = this.modbusDevice.asObservable();
  public timerStatus$ = this.timerStatus.asObservable();
  public contactStatus$ = this.contactStatus.asObservable();
  public textStatus$ = this.textStatus.asObservable();

  constructor() {}

  public newMessage(message: string): void {
    this.messageSource.next(message);
  }

  public newDate(date: any): void {
    this.dateSource.next(date);
  }

  public newListOfTable(list: any): void{
    this.listOfTable.next(list);
  }

  public newDevice(device: any): void{
    this.modbusDevice.next(device);
  }

  public newTimerStatus(timer: any): void{
    this.timerStatus.next(timer);
  }

  public newContactStatus(contact: any): void{
    this.contactStatus.next(contact);
  }

  public newTextStatus(text: any): void{
    this.textStatus.next(text);
  }
}
