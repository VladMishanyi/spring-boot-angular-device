import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.css']
})
export class ConnectorsComponent implements OnInit {
  public contactorInRealTime: boolean = false;
  public timerInRealTime: boolean = false;

  constructor(private bodyMessage: MessageService) { }

  ngOnInit(): void {
    this.bodyMessage.timerStatus$.subscribe( mes => {
      this.timerInRealTime = mes.content;
    });
    this.bodyMessage.contactStatus$.subscribe(mes => {
      this.contactorInRealTime = mes.content;
    });
  }

}
