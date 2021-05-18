import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "./services/message.service";
import {WebsocketServiceService} from "./services/websocket-service.service";
import * as moment from "moment";
import { saveAs } from 'file-saver';
import {RangeDateTimeWithZone, UserService} from "./objects/objectsSourse";
import {GraphicsService} from "./services/graphics.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title: string = 'angular8-springboot-websocket';
  // greeting = 'scrach';
  // name = '';
  // arrayMessages: Array<string> = ['first', 'second'];
  // fromServer: any;
  // user: UserService = {'name': 'egor', 'age': 44};
  rangeDate: RangeDateTimeWithZone = {'start': new Date(), 'end': new Date()};
  start: Date = new Date();
  end: Date = new Date();
  onDraw: boolean = false;
  currentDateTime: string;
  nameItem: string = "empty";
  timeItem: number = 7;
  valueInRealTimeStretch: number = 0;
  informationInRealTime: string = 'Очікую';
  contactorInRealTime: boolean = false;
  timerInRealTime: boolean = false;

  public startChart: Date = new Date();
  public endChart: Date = new Date();
  public bufferChart: number = 1000;
  public zoomChart: number = 10;
  public lineChartData: any;
  public lineChartLabels: any;
  public lineChartOptions: any;
  public lineChartColors: any;
  public lineChartLegend: any;
  public lineChartType: any;
  public lineChartPlugins: any;

  @ViewChild("baseChart") baseChart: ElementRef;
  @ViewChild("checkboxOnRealTimeRender") realTimeRender: ElementRef;

  constructor(private webSocketAPI: WebsocketServiceService,
              private bodyMessage: MessageService,
              private graphics: GraphicsService,
              baseChart: ElementRef,
              realTimeRender: ElementRef) {
    this.startChart = graphics.startChart;
    this.endChart = graphics.endChart;
    this.bufferChart = graphics.bufferChart;
    this.zoomChart = graphics.zoomChart;
    this.lineChartData = graphics.lineChartData;
    this.lineChartLabels = graphics.lineChartLabels;
    this.lineChartOptions = graphics.lineChartOptions;
    this.lineChartColors = graphics.lineChartColors;
    this.lineChartLegend = graphics.lineChartLegend;
    this.lineChartType = graphics.lineChartType;
    this.lineChartPlugins = graphics.lineChartPlugins;
    this.baseChart = baseChart;
    this.realTimeRender = realTimeRender;

    this.webSocketAPI._connect();
    this.currentDateTime = this.readCurrentDateTime();
    bodyMessage.dateStream$.subscribe( mes => {this.writeDateTimeFromServer(mes);});
    bodyMessage.modbusDevice$.subscribe(mes => {
      this.valueInRealTimeStretch = mes.holdingRegister0;
      if (this.onDraw) this.graphics.drawInRealTime(mes);
    });
    bodyMessage.listOfTable$.subscribe( mes => {
      this.graphics.genChart(mes);
      for (let i = 0; i < mes.length - 1; i++) {
        console.log("current date: " + mes[i].date);
      }
    });
    bodyMessage.timerStatus$.subscribe( mes => {
      this.timerInRealTime = mes;
      this.onDraw = mes;
    });
    bodyMessage.contactStatus$.subscribe(mes => {
      this.contactorInRealTime = mes;
    });
    bodyMessage.textStatus$.subscribe( mes => {
      this.informationInRealTime = mes;
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  public sendNameAndTimeItem(){}

  public writeDateTimeFromServer(range: RangeDateTimeWithZone): void{
    this.startChart = range.start;
    this.endChart = range.end;
    this.start = range.start;
    this.end = range.end;
    this.graphics.startChart = this.startChart;
    this.graphics.endChart = this.endChart;
  }

  public readCurrentDateTime(): string{
    return  moment().format("YYYY-MM-DD HH:mm:ss");
  }

  public valueChangeStartChart(valueStart: Date): void{
    this.start = valueStart;
  }

  public valueChangeEndChart(valueEnd: Date): void{
    this.end = valueEnd;
  }

  public sendChartBody(): void{
    this.rangeDate.start = this.start;
    this.rangeDate.end = this.end;
    this.webSocketAPI._sendRangeDateForChart(this.rangeDate);
  }

  // public addMessage(mes: string) {
  //   this.arrayMessages.push(mes);
  //   console.log(this.arrayMessages.toString());
  // }
  //
  // public removeMessage(index: number) {
  //   this.arrayMessages.splice(index, 1);
  // }
  //
  // public renderMessage() {
  //   this.addMessage(this.name);
  // }

  public connect() {
    this.webSocketAPI._connect();
  }

  public disconnect() {
    this.webSocketAPI._disconnect();
  }

  // public sendMessage() {
  //   this.webSocketAPI._send(this.name);
  // }

  public checkZoomValue() {
    this.graphics.zoomChart = this.zoomChart;
  }

  public checkBufferValue() {
    this.graphics.bufferChart = this.bufferChart;
  }

  public checkTheRenderStatus() {
    this.onDraw = this.realTimeRender.nativeElement.checked;
    this.graphics.onDraw = this.onDraw;
    console.log("test checkbox status :"+this.onDraw);
  }

  public clearChart() {
    this.graphics.clearChart();
  }

  public increaseChart() {
    this.graphics.increaseChart();
  }

  public decreaseChart() {
    this.graphics.decreaseChart();
  }

  public leftChart() {
    this.graphics.leftChart();
  }

  public rightChart() {
    this.graphics.rightChart();
  }

  public saveChart() {
    this.baseChart.nativeElement.toBlob(function(blob: any) {
      let dt = moment().format("YYYY-MM-DD HH:mm:ss");
      saveAs(blob, dt+"_chart");
    });
  }
}
