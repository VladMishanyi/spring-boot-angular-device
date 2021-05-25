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
  public title: string = 'Reometr';
  public start: Date = new Date();
  public end: Date = new Date();
  public lineChartData: any;
  public lineChartLabels: any;
  public lineChartOptions: any;
  public lineChartColors: any;
  public lineChartLegend: any;
  public lineChartType: any;
  public lineChartPlugins: any;
  public rangeDate: RangeDateTimeWithZone = new RangeDateTimeWithZone(new Date, new Date);

  // @ViewChild("baseChart")
  // baseChartDirective: BaseChartDirective;

  @ViewChild("baseChart")
  baseChart: ElementRef;

  constructor(private webSocketAPI: WebsocketServiceService,
              private bodyMessage: MessageService,
              private graphics: GraphicsService,
              // baseChartDirective: BaseChartDirective,
              baseChart: ElementRef) {
    this.lineChartData = graphics.lineChartData;
    this.lineChartLabels = graphics.lineChartLabels;
    this.lineChartOptions = graphics.lineChartOptions;
    this.lineChartColors = graphics.lineChartColors;
    this.lineChartLegend = graphics.lineChartLegend;
    this.lineChartType = graphics.lineChartType;
    this.lineChartPlugins = graphics.lineChartPlugins;
    // this.baseChartDirective = baseChartDirective;

    // this.graphics.baseChartDirective = baseChartDirective;
    this.baseChart = baseChart;
  }

  ngOnInit() {
    this.webSocketAPI.connect();
    this.bodyMessage.listOfTable$.subscribe( mes => {
      this.graphics.genChart(mes);
    });
    this.bodyMessage.listOfDevicesByIdReceive$.subscribe( mes => {
      this.graphics.genChart(mes);
    });
  }

  ngAfterViewInit() {}

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

  public saveChart(): void {
    this.baseChart.nativeElement.toBlob(function(blob: any) {
      let dt = moment().format("YYYY-MM-DD HH:mm:ss");
      saveAs(blob, dt+"_chart");
    });
  }

  public sendChartBody(): void{
    this.rangeDate.start = this.start;
    this.rangeDate.end = this.end;
    this.webSocketAPI.sendRangeDateForChart(this.rangeDate);
  }

  public clearChart() {
    this.graphics.clearChart();
  }
}
