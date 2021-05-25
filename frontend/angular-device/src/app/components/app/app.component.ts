import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {WebsocketServiceService} from "../../services/websocket-service.service";
import * as moment from "moment";
import { saveAs } from 'file-saver';
import {GraphicsService} from "../../services/graphics.service";
import {RangeDateTimeWithZone} from "../../model/RangeDateTimeWithZone";
import {TableModelMB110_1TD, TableModelRecipe} from "../../model/TableModel";
import {BaseChartDirective} from "ng2-charts";
import {JsonString} from "../../model/JsonString";
import {JsonNumber} from "../../model/JsonNumber";
import {DeviceModelMB110_1TD} from "../../model/DeviceModelMB110_1TD";

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



  public contactorInRealTime: boolean = false;
  public timerInRealTime: boolean = false;
  public searchPattern: JsonString = new JsonString('');
  public listOfRecipesByNamePattern: TableModelRecipe[] = [];



  public startChart: Date = new Date();
  public endChart: Date = new Date();
  public bufferChart: number = 100000;
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

  }

  ngOnInit() {
    this.webSocketAPI.connect();
    this.bodyMessage.modbusDevice$.subscribe(mes => {
      if (this.onDraw) this.graphics.drawInRealTime(mes);
    });
    this.bodyMessage.listOfTable$.subscribe( mes => {
      this.graphics.genChart(mes);
    });
    this.bodyMessage.recipeLastByDate$.subscribe( mes => {
      this.graphics.recipeName = mes.name;
      this.graphics.recipeTime = mes.time;
      // this.graphics.generateNewChartTitle();
      // this.graphics.updateGraphics();
    });
    this.bodyMessage.listOfDevicesByIdReceive$.subscribe( mes => {
      this.graphics.genChart(mes);
    });

    this.bodyMessage.timerStatus$.subscribe( mes => {
      this.timerInRealTime = mes.content;
      this.onDraw = mes.content;
    });
    this.bodyMessage.contactStatus$.subscribe(mes => {
      this.contactorInRealTime = mes.content;
    });

    this.bodyMessage.recipeStatus$.subscribe( mes => {
      this.recipe.id = mes.id;
      this.recipe.date = mes.date;
      this.recipe.name = mes.name;
      this.recipe.time = mes.time;
      this.graphics.recipeName = mes.name;
      this.graphics.recipeTime = mes.time;
      // this.graphics.generateNewChartTitle();
      // this.graphics.updateGraphics();
    });
    this.bodyMessage.recipeByNamePattern$.subscribe( mes => {
      this.listOfRecipesByNamePattern.length = 0;
      this.listOfRecipesByNamePattern.push(...mes);
    });

    this.sendRecipeLastByDate(0);
  }

  ngAfterViewInit() {}

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

  public sendGenerateChartByRecipeId(id: number): void{
    this.webSocketAPI.sendDeviceById(new JsonNumber(id));
  }

  public sendNameAndTimeItem(){
    this.webSocketAPI.sendRecipeItem(this.recipe);
  }

  public sendSearchPattern(){
    this.webSocketAPI.sendRecipeByNamePattern(this.searchPattern);
  }



  public sendRecipeLastByDate(value: number): void {
    this.webSocketAPI.sendRecipeLastByDate(new JsonNumber(value));
  }


  // public writeDateTimeFromServer(range: RangeDateTimeWithZone): void{
  //   this.startChart = range.start;
  //   this.endChart = range.end;
  //   this.start = range.start;
  //   this.end = range.end;
  //   this.graphics.startChart = this.startChart;
  //   this.graphics.endChart = this.endChart;
  // }



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
