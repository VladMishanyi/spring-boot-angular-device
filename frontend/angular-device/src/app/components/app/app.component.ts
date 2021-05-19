import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {WebsocketServiceService} from "../../services/websocket-service.service";
import * as moment from "moment";
import { saveAs } from 'file-saver';
import {GraphicsService} from "../../services/graphics.service";
import {RangeDateTimeWithZone} from "../../model/RangeDateTimeWithZone";
import {TableModelRecipe} from "../../model/TableModel";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  public title: string = 'angular8-springboot-websocket';
  public rangeDate: RangeDateTimeWithZone = new RangeDateTimeWithZone(new Date, new Date);
  public recipe: TableModelRecipe = new TableModelRecipe(0, new Date, 'empty', 7);
  public start: Date = new Date();
  public end: Date = new Date();
  public onDraw: boolean = false;
  public currentDateTime: string;
  public valueInRealTimeStretch: number = 0;
  public informationInRealTime: string = 'Очікую';
  public contactorInRealTime: boolean = false;
  public timerInRealTime: boolean = false;

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


    this.webSocketAPI.connect();
    this.currentDateTime = this.readCurrentDateTime();
    bodyMessage.modbusDevice$.subscribe(mes => {
      this.valueInRealTimeStretch = mes.holdingRegister0;
      if (this.onDraw) this.graphics.drawInRealTime(mes);
    });
    bodyMessage.listOfTable$.subscribe( mes => {
      this.graphics.genChart(mes);
    });
    bodyMessage.timerStatus$.subscribe( mes => {
      this.timerInRealTime = mes.content;
      this.onDraw = mes.content;
    });
    bodyMessage.contactStatus$.subscribe(mes => {
      this.contactorInRealTime = mes.content;
    });
    bodyMessage.textStatus$.subscribe( mes => {
      this.informationInRealTime = mes.content;
    });
    bodyMessage.recipeStatus$.subscribe( mes => {
      this.recipe.id = mes.id;
      this.recipe.date = mes.date;
      this.recipe.name = mes.name;
      this.recipe.time = mes.time;
      this.graphics.recipeName = mes.name;
      this.graphics.recipeTime = mes.time;
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  public sendNameAndTimeItem(){
    this.webSocketAPI.sendRecipeItem(this.recipe);
  }

  // public writeDateTimeFromServer(range: RangeDateTimeWithZone): void{
  //   this.startChart = range.start;
  //   this.endChart = range.end;
  //   this.start = range.start;
  //   this.end = range.end;
  //   this.graphics.startChart = this.startChart;
  //   this.graphics.endChart = this.endChart;
  // }

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
    this.webSocketAPI.sendRangeDateForChart(this.rangeDate);
  }

  public connect() {
    this.webSocketAPI.connect();
  }

  public disconnect() {
    this.webSocketAPI.disconnect();
  }

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
