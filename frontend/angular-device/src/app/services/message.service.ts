import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {TableModelMB110_1TD, TableModelRecipe} from "../model/TableModel";
import {DeviceModelMB110_1TD} from "../model/DeviceModelMB110_1TD";
import {JsonBoolean} from "../model/JsonBoolean";
import {JsonString} from "../model/JsonString";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private listOfTable = new Subject<TableModelMB110_1TD[]>();
  private modbusDevice = new Subject<DeviceModelMB110_1TD>();
  private timerStatus = new Subject<JsonBoolean>();
  private contactStatus = new Subject<JsonBoolean>();
  private textStatus = new Subject<JsonString>();
  private recipe = new Subject<TableModelRecipe>();

  public listOfTable$ = this.listOfTable.asObservable();
  public modbusDevice$ = this.modbusDevice.asObservable();
  public timerStatus$ = this.timerStatus.asObservable();
  public contactStatus$ = this.contactStatus.asObservable();
  public textStatus$ = this.textStatus.asObservable();
  public recipeStatus$ = this.recipe.asObservable();

  constructor() {}

  public newListOfTable(list: TableModelMB110_1TD[]): void {
    this.listOfTable.next(list);
  }

  public newDevice(device: DeviceModelMB110_1TD): void {
    this.modbusDevice.next(device);
  }

  public newTimerStatus(timer: JsonBoolean): void {
    this.timerStatus.next(timer);
  }

  public newContactStatus(contact: JsonBoolean): void {
    this.contactStatus.next(contact);
  }

  public newTextStatus(text: JsonString): void {
    this.textStatus.next(text);
  }

  public newRecipe(recipe: TableModelRecipe): void {
    this.recipe.next(recipe);
  }
}
