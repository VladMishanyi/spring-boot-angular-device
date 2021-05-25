import { Component, OnInit } from '@angular/core';
import {DeviceModelMB110_1TD} from "../../model/DeviceModelMB110_1TD";
import {JsonNumber} from "../../model/JsonNumber";
import {WebsocketServiceService} from "../../services/websocket-service.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public device: DeviceModelMB110_1TD = new DeviceModelMB110_1TD(0,0,0,0,0,0,0,0);
  public sensorMinValue: number = 0;
  public sensorMaxValue: number = 0;
  public sensorSetWeight: number = 0;

  constructor(private webSocketAPI: WebsocketServiceService,
              private bodyMessage: MessageService,) { }

  ngOnInit(): void {
      this.bodyMessage.allRegistersFromModbusDevice$.subscribe( mes => {
      this.device.holdingRegister0 = mes.holdingRegister0;
      this.device.holdingRegister1 = mes.holdingRegister1;
      this.device.holdingRegister2 = mes.holdingRegister2;
      this.device.holdingRegister3 = mes.holdingRegister3;
      this.device.holdingRegister4 = mes.holdingRegister4;
      this.device.holdingRegister5 = mes.holdingRegister5;
      this.device.holdingRegister6 = mes.holdingRegister6;
      this.device.holdingRegister7 = mes.holdingRegister7;
    });
  }

  public sendWriteEnableDisableWeightOfItem(value: number): void {
    this.webSocketAPI.sendWriteEnableDisableWeightOfItem(new JsonNumber(value));
  }

  public sendWriteSensitivitySensor(value: number): void {
    this.webSocketAPI.sendWriteSensitivitySensor(new JsonNumber(value));
  }

  public sendWriteMinBorderValueForSensor(): void {
    this.webSocketAPI.sendWriteMaxBorderValueForSensor(new JsonNumber(this.sensorMinValue));
  }

  public sendWriteMaxBorderValueForSensor(): void {
    this.webSocketAPI.sendWriteMaxBorderValueForSensor(new JsonNumber(this.sensorMaxValue));
  }

  public sendWriteSetWeightItem(): void {
    this.webSocketAPI.sendWriteSetWeightItem(new JsonNumber(this.sensorSetWeight));
  }

  public sendWriteWeightOfItemAsAZero(value: number): void {
    this.webSocketAPI.sendWriteWeightOfItemAsAZero(new JsonNumber(value));
  }

  public sendWriteSaveAllChanges(value: number): void {
    this.webSocketAPI.sendWriteSaveAllChanges(new JsonNumber(value));
  }

}
