import {Component, OnInit} from '@angular/core';
import {MessageService} from "./services/message.service";
import {WebsocketServiceService} from "./services/websocket-service.service";
import * as moment from "moment";
import { saveAs } from 'file-saver';
import {ChartDataSets, ChartType} from "chart.js";
import {Color, Label} from "ng2-charts";
import {RangeDateTimeWithZone, UserService} from "./objects/objectsSourse";


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
  currentDateTime: string;
  startChart: Date = new Date();
  endChart: Date = new Date();
  bufferChart: number = 1000;
  fromServer: any;
  user: UserService = {'name': 'egor', 'age': 44};
  rangeDate: RangeDateTimeWithZone = {'start': new Date(), 'end': new Date()};
  start: Date = new Date();
  end: Date = new Date();

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
    this.webSocketAPI._connect();

    this.currentDateTime = this.readCurrentDateTime();

    saveAs(new Blob(), "dd");

    bodyMessage.messageStream$.subscribe(mes => {this.addMessage(mes);});
    bodyMessage.dateStream$.subscribe( mes => {this.writeDateTimeFromServer(mes);});

  }


  ngOnInit() {}

  writeDateTimeFromServer(range: RangeDateTimeWithZone): void{
    this.startChart = range.start;
    this.endChart = range.end;
    this.start = range.start;
    this.end = range.end;
  }

  readCurrentDateTime(): string{
    return  moment().format("YYYY-MM-DD HH:mm:ss");
  }

  valueChangeStartChart(valueStart: Date): void{
    this.start = valueStart;
  }

  valueChangeEndChart(valueEnd: Date): void{
    this.end = valueEnd;
  }

  sendChartBody(): void{
  }

  saveChart(): void{
    this.rangeDate.start = this.start;
    this.rangeDate.end = this.end;
    this.webSocketAPI._sendDate(this.rangeDate);
  }

  increaseChart(): void{

  }

  decreaseChart(): void{

  }

  leftChart(): void{

  }

  rightChart(): void{

  }

  clearChart(): void{

  }

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
