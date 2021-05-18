import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {DeviceModelMB110_1TD, JsonBoolean, JsonString, TableModelMB110_1TD} from "../objects/objectsSourse";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject<string>();
  private dateSource = new Subject<any>();
  private listOfTable = new Subject<TableModelMB110_1TD[]>();
  private modbusDevice = new Subject<DeviceModelMB110_1TD>();
  private timerStatus = new Subject<JsonBoolean>();
  private contactStatus = new Subject<JsonBoolean>();
  private textStatus = new Subject<JsonString>();


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

  public newTimerStatus(timer: JsonBoolean): void{
    this.timerStatus.next(timer);
  }

  public newContactStatus(contact: JsonBoolean): void{
    this.contactStatus.next(contact);
  }

  public newTextStatus(text: JsonString): void{
    this.textStatus.next(text);
  }
}
