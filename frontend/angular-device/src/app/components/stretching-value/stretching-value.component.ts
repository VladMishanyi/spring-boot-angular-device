import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-stretching-value',
  templateUrl: './stretching-value.component.html',
  styleUrls: ['./stretching-value.component.css']
})
export class StretchingValueComponent implements OnInit {
  public valueInRealTimeStretch: number = 0;

  constructor(private bodyMessage: MessageService) { }

  ngOnInit(): void {
    this.bodyMessage.modbusDevice$.subscribe(mes => {
      this.valueInRealTimeStretch = mes.holdingRegister0;
    });
  }
}
