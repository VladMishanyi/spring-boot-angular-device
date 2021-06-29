import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  public informationInRealTime: string = 'Очікую';

  constructor(private bodyMessage: MessageService) { }

  ngOnInit(): void {
    this.bodyMessage.textStatus$.subscribe( mes => {
      this.informationInRealTime = mes.content;
    });
  }

}
