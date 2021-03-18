import {Component, OnInit} from '@angular/core';
import {MessageService} from "./services/message.service";
import {WebsocketServiceService} from "./services/websocket-service.service";
import * as moment from "moment";
import { saveAs } from 'file-saver';
import {ChartDataSets, ChartType} from "chart.js";
import {Color, Label} from "ng2-charts";
// import * as saveAs from 'file-saver';
// declare function saveAs();


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular8-springboot-websocket';
  greeting = 'scrach';
  name = '';
  arrayMessages: Array<string> = ['first', 'second'];
  currentDateTime: any;

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';


  constructor(private webSocketAPI: WebsocketServiceService, private bodyMessage: MessageService) {
    this.currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    saveAs(new Blob(), "dd");
    bodyMessage.messageStream$.subscribe(
      mes => {
        this.addMessage(mes);
      }
    );
  }

  ngOnInit() {}

  addMessage(mes: string) {
    this.arrayMessages.push(mes);
    console.log(this.arrayMessages.toString());
  }

  removeMessage(index: number) {
    this.arrayMessages.splice(index, 1);
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }

  public renderMessage() {
    this.addMessage(this.name);
  }

}
