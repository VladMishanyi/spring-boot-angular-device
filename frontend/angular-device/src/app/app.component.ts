import {Component, OnInit} from '@angular/core';
import {MessageService} from "./services/message.service";
import {WebsocketServiceService} from "./services/websocket-service.service";
import * as moment from "moment";
import { saveAs } from 'file-saver';
import {
  ChartDataSets,
  ChartType,
  PositionType,
  ChartArea,
  ChartSize,
  ChartTitleOptions,
  ChartLegendOptions,
  ChartTooltipOptions,
  ChartHoverOptions,
  ChartAnimationOptions,
  ChartElementsOptions,
  ChartLayoutOptions,
  RadialLinearScale,
  ChartScales,
  LinearScale,
  LogarithmicScale,
  TimeScale,
  ChartPluginsOptions,
  ChartColor,
  CubicInterpolationMode,
  Scriptable,
  BorderAlignment,
  BorderWidth,
  ChartPoint,
  PointStyle,
  ChartLegendLabelItem, ChartLegendLabelOptions, ChartData
} from "chart.js";
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
  vTitle = 'Объект/Киевгума/Отдел ГЭ/Температура помещения'+' с ' + this.startChart.toString() + ' по ' + this.endChart.toString();
  positionTypeTitle: PositionType = 'top';

  lineChartData: ChartDataSets[] = [
    {
      // cubicInterpolationMode?: CubicInterpolationMode | Scriptable<CubicInterpolationMode>;
      backgroundColor: '#00CC00',
      // barPercentage?: number;
      // barThickness?: number | "flex";
      // borderAlign?: BorderAlignment | BorderAlignment[] | Scriptable<BorderAlignment>;
      borderWidth: 5,
      borderColor: '#00CC00',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      // borderSkipped?: PositionType | PositionType[] | Scriptable<PositionType>;
      // categoryPercentage?: number;
      data: [85, 72, 78, 75, 77, 75],
      fill: false,
      // hitRadius?: number | number[] | Scriptable<number>;
      // hoverBackgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
      // hoverBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
      // hoverBorderWidth?: number | number[] | Scriptable<number>;
      // hoverRadius?: number;
      label: 'Crude oil prices',
      lineTension: 0.1,
      // maxBarThickness?: number;
      // minBarLength?: number;
      steppedLine: false,
      // order?: number;
      pointBorderColor: '#FF0000',
      pointBackgroundColor: '#000000',
      pointBorderWidth: 0,
      pointRadius: 0,
      // pointRotation?: number | number[] | Scriptable<number>;
      pointHoverRadius: 5,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#000000',
      pointHoverBorderColor: '#FF0000',
      pointHoverBorderWidth: 2,
      // pointStyle?: PointStyle | HTMLImageElement | HTMLCanvasElement | Array<PointStyle | HTMLImageElement | HTMLCanvasElement> | Scriptable<PointStyle | HTMLImageElement | HTMLCanvasElement>;
      // radius?: number | number[] | Scriptable<number>;
      // rotation?: number | number[] | Scriptable<number>;
      // xAxisID?: string;
      // yAxisID?: string;
      // type?: ChartType | string;
      // hidden?: boolean;
      // hideInLegendAndTooltip?: boolean;
      showLine: true,
      // stack?: string;
      spanGaps: false,
      // weight?: number;
    },
    {
      // cubicInterpolationMode?: CubicInterpolationMode | Scriptable<CubicInterpolationMode>;
      backgroundColor: '#ffff00',
      // barPercentage?: number;
      // barThickness?: number | "flex";
      // borderAlign?: BorderAlignment | BorderAlignment[] | Scriptable<BorderAlignment>;
      borderWidth: 5,
      borderColor: '#ffff00',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      // borderSkipped?: PositionType | PositionType[] | Scriptable<PositionType>;
      // categoryPercentage?: number;
      data: [15, 42, 23, 102, 120, 48],
      fill: false,
      // hitRadius?: number | number[] | Scriptable<number>;
      // hoverBackgroundColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
      // hoverBorderColor?: ChartColor | ChartColor[] | Scriptable<ChartColor>;
      // hoverBorderWidth?: number | number[] | Scriptable<number>;
      // hoverRadius?: number;
      label: 'Температура2',
      lineTension: 0.1,
      // maxBarThickness?: number;
      // minBarLength?: number;
      steppedLine: false,
      // order?: number;
      pointBorderColor: '#FF0000',
      pointBackgroundColor: '#000000',
      pointBorderWidth: 0,
      pointRadius: 0,
      // pointRotation?: number | number[] | Scriptable<number>;
      pointHoverRadius: 5,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#000000',
      pointHoverBorderColor: '#FF0000',
      pointHoverBorderWidth: 2,
      // pointStyle?: PointStyle | HTMLImageElement | HTMLCanvasElement | Array<PointStyle | HTMLImageElement | HTMLCanvasElement> | Scriptable<PointStyle | HTMLImageElement | HTMLCanvasElement>;
      // radius?: number | number[] | Scriptable<number>;
      // rotation?: number | number[] | Scriptable<number>;
      // xAxisID?: string;
      // yAxisID?: string;
      // type?: ChartType | string;
      // hidden?: boolean;
      // hideInLegendAndTooltip?: boolean;
      showLine: true,
      // stack?: string;
      spanGaps: false,
      // weight?: number;
    }
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  linePositionType: PositionType = 'top';

  lineChartTitleOptions = {
    display: true,
    position: this.linePositionType,
    // fullWidth?: boolean;
    fontSize: 22,
    fontFamily: 'sans-sherif',
    fontColor: '#985f0d',
    fontStyle: 'bold',
    padding: 10,
    lineHeight: 1.2,
    text: this.vTitle
  }

  lineLegendPositionType: PositionType = 'right';

  lineChartLegendLabelOptions = {
    boxWidth: 40,
    fontSize: 22,
    fontStyle: 'bold',
    fontColor: ['#985f0d'],
    fontFamily: 'sans-sherif',
    padding: 10,
    // generateLabels?(chart: Chart): ChartLegendLabelItem[];
    // filter?(legendItem: ChartLegendLabelItem, data: ChartData): any;
    // usePointStyle?: boolean;
  }

  lineChartLegendOptions = {
    // align?: 'center' | 'end' | 'start';
    display: true,
    position: this.lineLegendPositionType,
    fullWidth: true,
    // onClick?(event: MouseEvent, legendItem: ChartLegendLabelItem): void;
    // onHover?(event: MouseEvent, legendItem: ChartLegendLabelItem): void;
    // onLeave?(event: MouseEvent, legendItem: ChartLegendLabelItem): void;
    labels: this.lineChartLegendLabelOptions,
    reverse: false,
    // rtl?: boolean;
    // textDirection?: string;
  }

  lineChartOptions = {
    responsive: true,
    responsiveAnimationDuration: 1,
    // aspectRatio?: number;
    maintainAspectRatio: true,
    events: ['click'],
    // legendCallback?(chart: Chart): string;
    // onHover?(this: Chart, event: MouseEvent, activeElements: Array<{}>): any;
    // onClick?(event?: MouseEvent, activeElements?: Array<{}>): any;
    // onResize?(this: Chart, newSize: ChartSize): void;
    title: this.lineChartTitleOptions,
    legend: this.lineChartLegendOptions,
    tooltips?: ChartTooltipOptions;
    hover?: ChartHoverOptions;
    animation?: ChartAnimationOptions;
    elements?: ChartElementsOptions;
    layout?: ChartLayoutOptions;
    scale?: RadialLinearScale;
    scales?: ChartScales | LinearScale | LogarithmicScale | TimeScale;
    showLines?: boolean;
    spanGaps?: boolean;
    cutoutPercentage?: number;
    circumference?: number;
    rotation?: number;
    devicePixelRatio?: number;
    plugins?: ChartPluginsOptions;
    defaultColor?: ChartColor;
  }












  lineChartOptions = {
//     layout: {
//       padding: {
//         left: 50,
//         right: 0,
//         top: 0,
//         bottom: 0
//       }
//     },
//     legend: {
//       display: true,
//       // position: 'right',/*11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111*/
//       fullWidth: true,//Marks that this box should take the full width of the canvas (pushing down other boxes). This is unlikely to need to be changed in day-to-day use.
//       reverse: false,//Legend will show datasets in reverse order.
//       labels: {
//         boxWidth: 40,
//         fontSize: 22,
//         fontStyle: 'bold',
//         fontColor: '#985f0d',
//         fontFamily: 'sans-sherif',
//         padding: 10
//       }
//     },
//     title: {
//       display: true,
//       // position: 'top',/*11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111*/
//       fontSize: 22,
//       fontFamily: 'sans-sherif',
//       fontColor: '#985f0d',
//       fontStyle: 'bold',
//       padding: 10,
//       lineHeight: 1.2,
//       text: this.vTitle
//     },
//     tooltips: {
//       enabled: true,
//       // mode: 'nearest',/*11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111*/
//       intersect: true,//if true, the tooltip mode applies only when the mouse position intersects with an element. If false, the mode will be applied at all times.
//       position: 'average',
//       backgroundColor: '#100000',
//       titleFontFamily: 'Arial',
//       titleFontSize: 20,
//       titleFontStyle: 'italic',
//       titleFontColor: '#ffffff',
//       titleSpacing: 2,
//       titleMarginBottom: 6,
//       bodyFontFamily: 'Arial',
//       bodyFontSize: 22,
//       bodyFontStyle: 'normal',
//       bodyFontColor: '#ffffff',
//       bodySpacing: 2,
//       footerFontFamily: 'Helvetica',
// //                    footerFontSize: 40,
// //                    footerFontStyle: 'bold',
// //                    footerFontColor: '#ffffff',
// //                    footerSpacing: 2,
// //                    footerMarginTop: 6,
//       xPadding: 6,
//       yPadding: 6,
//       caretPadding: 2,
//       caretSize: 5,
//       cornerRadius: 6,
//       multiKeyBackground: '#ffffff',
//       // displayColors: 'true',/*111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111*/
//       borderColor: '#000000',
//       borderWidth: 0
//     },
//     elements: {
//       point: {
//         radius: 3,
//         // pointStyle: 'circle',/*1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111*/
//         backgroundColor: '#000000',
//         borderWidth: 1,
//         borderColor: '#000000',
//         hitRadius: 1,
//         hoverRadius: 4,
//         hoverBorderWidth: 1
//       },
//       line: {
//         tension: 0,
//         backgroundColor: '#000000',
//         borderWidth: 3,
//         borderColor: '#000000',
//         borderCapStyle: 'butt',
//         borderDashOffset: 0,
//         borderJoinStyle: 'miter',
//         capBezierPoints: true,
//         fill: true,
//         stepped: false
//       },
//       rectangle: {
//         backgroundColor: '#000000',
//         borderWidth: 0,
//         borderColor: '#000000',
//         borderSkipped: 'bottom'
//       },
//       arc: {
//         backgroundColor: '#000000',
//         borderColor: '#ffffff',
//         borderWidth: 2
//       }
//     },
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero:true, // start chart from zero point
//           fontColor: '#985f0d',
//           fontFamily: 'sans-sherif',
//           fontSize: 22,
//           fontStyle: 'bold',
// //                    min: 0,
// //                    max: 300,
//           stepSize: 5
// //                            stacked: true //Line charts can be configured into stacked area charts by changing the settings on the y axis to enable stacking
//         },
//         gridLines: {
//           color: '#985f0d',
//           lineWidth: 1
//         }
//       }],
//       xAxes: [{
//         type: 'time',
//         distribution: 'series',
//         time: {
//           unit: 'hour',
//           stepSize: 1,
//           displayFormats: {
//             millisecond: 'YYYY-MM-DD HH:mm:ss',
//             second: 'YYYY-MM-DD HH:mm:ss',
//             minute: 'YYYY-MM-DD HH:mm:ss',
//             hour: 'YYYY-MM-DD HH:mm:ss',
//             day: 'YYYY-MM-DD HH:mm:ss',
//             week: 'YYYY-MM-DD HH:mm:ss',
//             month: 'YYYY-MM-DD HH:mm:ss',
//             quarter: 'YYYY-MM-DD HH:mm:ss',
//             year: 'YYYY-MM-DD HH:mm:ss'
//           }
//         },
//         ticks: {
//           beginAtZero:true, // start chart from zero point
//           fontColor: '#985f0d',
//           fontFamily: 'sans-sherif',
//           fontSize: 22,
//           fontStyle: 'bold'
// //                            stacked: true //Line charts can be configured into stacked area charts by changing the settings on the y axis to enable stacking
//         },
//         gridLines: {
//           color: '#985f0d',
//           lineWidth: 1
//         }
//       }]
//     },
//     animation: {
//       duration: 0,// general animation time
//       // easing: 'easeOutQuart',/*1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111*/
//     },
//     hover: {
//       intersect: true,//if true, the hover mode only applies when the mouse position intersects an item on the chart.
//       // axis: 'x',//Can be set to 'x', 'y', or 'xy' to define which directions are used in calculating distances./*1111111111111111111111111111111111111111111111111111*/
//       animationDuration: 0,// duration of animations when hovering an item
//     },
    responsiveAnimationDuration: 0,// animation duration after a resize
    responsive: true,// Resizes the chart canvas when its container does
    maintainAspectRatio: true,// Maintain the original canvas aspect ratio (width / height) when resizing.
    showLines: true,//If false, the line is not drawn for this dataset.
    spanGaps: false,//If true, lines will be drawn between points with no or null data. If false, points with NaN data will create a break in the line
    // This chart will not respond to mousemove, etc
    events: ['click']
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


  constructor(private webSocketAPI: WebsocketServiceService, private bodyMessage: MessageService, private window: Window) {
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







  // private globalX: Array<Date> = [];
  // private globalY1: Array<number> = [];
  // private globalY2: Array<number> = [];
  // private increaseDecriaseZoom: number = 0;
  // private leftRightPosition: number = 0;
  // public genChart(data: any): void{
  //   let x: Array<Date> = [];
  //   let y1: Array<number> = [];
  //   let y2: Array<number> = [];
  //   let utcLocalDateTimeOffset = getUtcOffset(data[0]["date"]);
  //   for (let i: number=0; i < data.length; i++){
  //     if (data.hasOwnProperty(i)){
  //       try {
  //         x[i] = moment(data[i]["date"], "YYYY,MM,DD,HH,mm,ss").utcOffset(utcLocalDateTimeOffset).toDate();
  //         y1[i] = data[i]["holdingRegister0"];
  //         y2[i] = data[i]["holdingRegister1"];
  //
  //       }catch (err){
  //         console.log('Ошибка ' + err.name + ":" + err.message + "\n" + err.stack);
  //       }
  //     }
  //   }
  //   this.globalX = x;
  //   this.globalY1 = y1;
  //   this.globalY2 = y2;
  //
  //   this.increaseDecriaseZoom = 0;
  //   this.leftRightPosition = 0;
  //   buildChart(x, y1, y2);
  // }
  //
  // public buildChart(x: Date, y1: number, y2: number) {
  //   config.data.labels = x;
  //   config.data.datasets[0].data = y1;
  //   config.data.datasets[1].data = y2;
  //   this.window.baseChart.update();
  // }
  //
  // function clearChart(){
  //   // $('#myChart').remove(); // this is my <canvas> element
  //   // $('#graph-container').append('<canvas id="myChart" width="400" height="150"><canvas>');
  //   globalX = [];
  //   globalY1 = [];
  //   globalY2 = [];
  //   config.data.labels = [];
  //   config.data.datasets.forEach(function(dataset) {
  //     dataset.data = [];
  //   });
  //   window.myLine.update();
  // }
  //
  // function addLastElementToChart(X1, Y1, Y2) {
  //   globalX.push(X1);
  //   globalY1.push(Y1);
  //   globalY2.push(Y2);
  //   config.data.labels.push(X1);
  //   config.data.datasets[0].data.push(Y1);
  //   config.data.datasets[1].data.push(Y2);
  //   window.myLine.update();
  // }
  //
  // function removeFirstElementFromChart() {
  //   globalX.shift();
  //   globalY1.shift();
  //   config.data.labels.shift();
  //   config.data.datasets.forEach(function(dataset) {
  //     dataset.data.shift();
  //   });
  //   window.myLine.update();
  // }
  //
  // function drawInRealTime(parsed) {
  //   let buffer = document.getElementById("bufferChart").value;
  //   let x = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
  //   let y1 = parsed.holdingRegister0;
  //   let y2 = parsed.holdingRegister1;
  //   if (config.data.labels.length < buffer){
  //     addLastElementToChart(x, y1, y2);
  //   }
  //   if (config.data.labels.length >= buffer){
  //     removeFirstElementFromChart();
  //   }
  // }
  //
  // function increaseChart() {
  //   let increaseZoom = document.getElementById("zoom-chart").value;
  //   let increaseArrayX = [];
  //   let increaseArrayY1 = [];
  //   let increaseArrayY2 = [];
  //   if ((0 < increaseDecriaseZoom - leftRightPosition) || (globalX.length > increaseDecriaseZoom - leftRightPosition)){
  //     increaseDecriaseZoom = increaseDecriaseZoom + Number(increaseZoom);
  //     let from = increaseDecriaseZoom - leftRightPosition;
  //     let to = globalX.length - increaseDecriaseZoom - leftRightPosition;
  //     increaseArrayX = globalX.slice(from,to);
  //     increaseArrayY1 = globalY1.slice(from,to);
  //     increaseArrayY2 = globalY2.slice(from,to);
  //     this.generateNewChartTitle(increaseArrayX[0], increaseArrayX[increaseArrayX.length - 1]);
  //     buildChart(increaseArrayX, increaseArrayY1, increaseArrayY2);
  //   }
  // }
  //
  // function decreaseChart() {
  //   let increaseZoom = document.getElementById("zoom-chart").value;
  //   let increaseArrayX = [];
  //   let increaseArrayY1 = [];
  //   let increaseArrayY2 = [];
  //   if ((0 < increaseDecriaseZoom - leftRightPosition) || (globalX.length > increaseDecriaseZoom - leftRightPosition)){
  //     increaseDecriaseZoom = increaseDecriaseZoom - Number(increaseZoom);
  //     let from = increaseDecriaseZoom - leftRightPosition;
  //     let to = globalX.length - increaseDecriaseZoom - leftRightPosition;
  //     increaseArrayX = globalX.slice(from,to);
  //     increaseArrayY1 = globalY1.slice(from,to);
  //     increaseArrayY2 = globalY2.slice(from,to);
  //     this.generateNewChartTitle(increaseArrayX[0], increaseArrayX[increaseArrayX.length - 1]);
  //     buildChart(increaseArrayX, increaseArrayY1, increaseArrayY2);
  //   }
  // }
  //
  // function leftChart() {
  //   let increaseZoom = document.getElementById("zoom-chart").value;
  //   let increaseArrayX = [];
  //   let increaseArrayY1 = [];
  //   let increaseArrayY2 = [];
  //   if ((0 < increaseDecriaseZoom - leftRightPosition) || (globalX.length > increaseDecriaseZoom - leftRightPosition)){
  //     leftRightPosition = leftRightPosition + Number(increaseZoom);
  //     let from = increaseDecriaseZoom - leftRightPosition;
  //     let to = globalX.length - increaseDecriaseZoom - leftRightPosition;
  //     increaseArrayX = globalX.slice(from,to);
  //     increaseArrayY1 = globalY1.slice(from,to);
  //     increaseArrayY2 = globalY1.slice(from,to);
  //     this.generateNewChartTitle(increaseArrayX[0], increaseArrayX[increaseArrayX.length - 1]);
  //     buildChart(increaseArrayX, increaseArrayY1, increaseArrayY2);
  //   }
  // }
  //
  // function rightChart() {
  //   let increaseZoom = document.getElementById("zoom-chart").value;
  //   let increaseArrayX = [];
  //   let increaseArrayY1 = [];
  //   let increaseArrayY2 = [];
  //   if ((0 < increaseDecriaseZoom - leftRightPosition) || (globalX.length > increaseDecriaseZoom - leftRightPosition)){
  //     leftRightPosition  = leftRightPosition  - Number(increaseZoom);
  //     let from = increaseDecriaseZoom - leftRightPosition;
  //     let to = globalX.length - increaseDecriaseZoom - leftRightPosition;
  //     increaseArrayX = globalX.slice(from,to);
  //     increaseArrayY1 = globalY1.slice(from,to);
  //     increaseArrayY2 = globalY2.slice(from,to);
  //     this.generateNewChartTitle(increaseArrayX[0], increaseArrayX[increaseArrayX.length - 1]);
  //     buildChart(increaseArrayX, increaseArrayY1, increaseArrayY2);
  //   }
  // }
  //
  // function saveChart() {
  //   $("#myChart").get(0).toBlob(function(blob) {
  //     let dt = moment().format("YYYY-MM-DD HH:mm:ss");
  //     saveAs(blob, dt+"_chart");
  //   });
  // }
  //
  // window.onload = function() {
  //   let ctx = document.getElementById("myChart").getContext("2d");
  //   window.myLine = getNewChart(ctx, config);
  // }
  //
  // function getNewChart(ctx, config) {
  //   return new Chart(ctx, config);
  // }
  //
  // function getUtcOffset(date) {
  //   let minutesOffset = moment(date, "YYYY,MM,DD,HH,mm,ss").parseZone().utcOffset();
  //   let hoursOffset = minutesOffset/60;
  //   return minutesOffset;
  // }

}
