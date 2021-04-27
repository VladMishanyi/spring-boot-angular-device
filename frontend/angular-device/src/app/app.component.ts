import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  ChartLegendLabelItem,
  ChartLegendLabelOptions,
  ChartData,
  ChartTooltipModel,
  InteractionMode,
  TextAlignment,
  ChartTooltipCallback,
  ChartTooltipItem,
  Easing,
  ChartPointOptions,
  ChartLineOptions,
  ChartArcOptions,
  ChartRectangleOptions,
  FillMode,
  ChartLayoutPaddingObject,
  ScaleType,
  GridLineOptions,
  ScaleTitleOptions,
  TickOptions,
  ChartXAxe,
  ChartYAxe,
  NestedTickOptions,
  MajorTickOptions,
  DateAdapterOptions,
  TimeDisplayFormat,
  TimeUnit,
  InteractionModeRegistry
} from "chart.js";
import {Color, Label} from "ng2-charts";
import {RangeDateTimeWithZone, UserService} from "./objects/objectsSourse";

type AxisNative = 'x' | 'y' | 'xy';
type DistributionNative = 'linear' | 'series';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'angular8-springboot-websocket';
  greeting = 'scrach';
  name = '';
  arrayMessages: Array<string> = ['first', 'second'];
  currentDateTime: string;
  startChart: Date = new Date();
  endChart: Date = new Date();
  bufferChart: number = 1000;
  zoomChart: number = 10;
  fromServer: any;
  user: UserService = {'name': 'egor', 'age': 44};
  rangeDate: RangeDateTimeWithZone = {'start': new Date(), 'end': new Date()};
  start: Date = new Date();
  end: Date = new Date();
  vTitle = 'Объект/Киевгума/Отдел ГЭ/Температура помещения'+' с ' + this.startChart.toString() + ' по ' + this.endChart.toString();
  globalX: Array<string> = [];
  globalY1: Array<number> = [];
  globalY2: Array<number> = [];
  increaseDecriaseZoom: number = 0;
  leftRightPosition: number = 0;
  dataLegend1: Array<number> = [85, 72, 78, 75, 77, 75];
  dataLegend2: Array<number> = [15, 42, 23, 102, 120, 48];
  nameItem: string = "empty";
  timeItem: number = 7;
  valueInRealTimeStretch: number = 0;
  informationInRealTime: string = "Почато випробування";
  contactorInRealTime: boolean = false;
  timerInRealTime: boolean = false;

  @ViewChild("baseChart") baseChart: ElementRef;

  public generateNewChartTitle(start: string, end: string) {
    this.vTitle = 'Объект/Киевгума/Отдел ГЭ/Температура помещения'+' с '+start+' по '+end;
  }
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
      data: this.dataLegend1,
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
      data: this.dataLegend2,
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
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  lineChartLabels: Label[] =
    [
      moment().format('YYYY-MM-DD HH:mm:ss').toString(),
      moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss').toString(),
      moment().add(2, 'hours').format('YYYY-MM-DD HH:mm:ss').toString(),
      moment().add(3, 'hours').format('YYYY-MM-DD HH:mm:ss').toString(),
      moment().add(4, 'hours').format('YYYY-MM-DD HH:mm:ss').toString(),
      moment().add(5, 'hours').format('YYYY-MM-DD HH:mm:ss').toString(),
      moment().add(6, 'hours').format('YYYY-MM-DD HH:mm:ss').toString()
    ];
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  lineLegendPositionType: PositionType = 'top';
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
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  lineInteractionMode: InteractionMode = 'nearest';
  lineChartTooltipOptions = {
    // axis?: 'x'|'y'|'xy';
    enabled: true,
    // custom?: (tooltipModel: ChartTooltipModel) => void;
    mode: this.lineInteractionMode,
    intersect: true,
    backgroundColor: '#100000',
    // titleAlign?: TextAlignment;
    titleFontFamily: 'Arial',
    titleFontSize: 20,
    titleFontStyle: 'italic',
    titleFontColor: '#ffffff',
    titleSpacing: 2,
    titleMarginBottom: 6,
    // bodyAlign?: TextAlignment;
    bodyFontFamily: 'Arial',
    bodyFontSize: 22,
    bodyFontStyle: 'normal',
    bodyFontColor: '#ffffff',
    bodySpacing: 2,
    // footerAlign?: TextAlignment;
    footerFontFamily: 'Helvetica',
    // footerFontSize?: number;
    // footerFontStyle?: string;
    // footerFontColor?: ChartColor;
    // footerSpacing?: number;
    // footerMarginTop?: number;
    xPadding: 6,
    yPadding: 6,
    caretSize: 5,
    cornerRadius: 6,
    multiKeyBackground: '#ffffff',
    // callbacks?: ChartTooltipCallback;
    // filter?(item: ChartTooltipItem, data: ChartData): boolean;
    // itemSort?(itemA: ChartTooltipItem, itemB: ChartTooltipItem, data?: ChartData): number;
    position: 'average',
    caretPadding: 2,
    displayColors: true,
    borderColor: '#000000',
    borderWidth: 0,
    // rtl?: boolean;
    // textDirection?: string;
  }
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  currentAxis: AxisNative = 'x';
  lineChartHoverOptions = {
    // mode?: InteractionMode;
    animationDuration: 1,
    intersect: true,
    axis: this.currentAxis,
    // onHover?(this: Chart, event: MouseEvent, activeElements: Array<{}>): any;
  }
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  lineEasing: Easing = 'easeOutQuart';
  lineChartAnimationOptions = {
    duration: 1,
    easing: this.lineEasing,
    // onProgress?(chart: any): void;
    // onComplete?(chart: any): void;
    // animateRotate?: boolean;
    // animateScale?: boolean;
  }
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  linePointStyle: PointStyle = 'circle';
  lineChartPointOptions = {
    radius: 3,
    pointStyle: this.linePointStyle,
    // rotation?: number | Scriptable<number>;
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#000000',
    hitRadius: 1,
    hoverRadius: 4,
    hoverBorderWidth: 1
  }
  lineChartLineOptions = {
    // cubicInterpolationMode?: CubicInterpolationMode | Scriptable<CubicInterpolationMode>;
    tension: 0,
    backgroundColor: '#000000',
    borderWidth: 3,
    borderColor: '#000000',
    borderCapStyle: 'butt',
    // borderDash?: any[] | Scriptable<any[]>;
    borderDashOffset: 0,
    borderJoinStyle: 'miter',
    capBezierPoints: true,
    fill: true,
    stepped: false
  }
  lineChartArcOptions = {
    // angle?: number | Scriptable<number>;
    backgroundColor: '#000000',
    // borderAlign?: BorderAlignment | Scriptable<BorderAlignment>;
    borderColor: '#ffffff',
    borderWidth: 2
  }
  lineChartRectangleOptions = {
    backgroundColor: '#000000',
    borderWidth: 0,
    borderColor: '#000000',
    borderSkipped: 'bottom'
  }
  lineChartElementsOptions = {
    point: this.lineChartPointOptions,
    line: this.lineChartLineOptions,
    arc: this.lineChartArcOptions,
    rectangle: this.lineChartRectangleOptions
  }
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  lineChartLayoutPaddingObject = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
  lineChartLayoutOptions = {
    padding: this.lineChartLayoutPaddingObject
  }
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  lineTickOptions = {
    // minor?: NestedTickOptions | false;
    // major?: MajorTickOptions | false;
    // autoSkip?: boolean;
    // autoSkipPadding?: number;
    // backdropColor?: ChartColor;
    // backdropPaddingX?: number;
    // backdropPaddingY?: number;
    beginAtZero:true,
    /**
     * If the callback returns null or undefined the associated grid line will be hidden.
     */
    // callback?(value: number | string, index: number, values: number[] | string[]): string | number | null | undefined;
    // display?: boolean;
    fontColor: '#985f0d',
    fontFamily: 'sans-sherif',
    fontSize: 22,
    fontStyle: 'bold',
    // labelOffset?: number;
    // lineHeight?: number;
    // max: 300,
    // maxRotation?: number;
    // maxTicksLimit?: number;
    // min: 0,
    // minRotation?: number;
    // mirror?: boolean;
    // padding?: number;
    // precision?: number;
    // reverse?: boolean;
    /**
     * The number of ticks to examine when deciding how many labels will fit.
     * Setting a smaller value will be faster, but may be less accurate
     * when there is large variability in label length.
     * Deault: `ticks.length`
     */
    // sampleSize?: number;
    // showLabelBackdrop?: boolean;
    // source?: 'auto' | 'data' | 'labels';
    stepSize: 5,
    // suggestedMax?: number;
    // suggestedMin?: number;
  }
  lineGridLineOptions = {
    // display?: boolean;
    // circular?: boolean;
    color: '#985f0d',
    // borderDash?: number[];
    // borderDashOffset?: number;
    lineWidth: 1
    // drawBorder?: boolean;
    // drawOnChartArea?: boolean;
    // drawTicks?: boolean;
    // tickMarkLength?: number;
    // zeroLineWidth?: number;
    // zeroLineColor?: ChartColor;
    // zeroLineBorderDash?: number[];
    // zeroLineBorderDashOffset?: number;
    // offsetGridLines?: boolean;
    // z?: number;
  }
  lineChartYAxe = {
    // bounds?: string;
    // type?: ScaleType | string;
    // display?: boolean | string;
    // id?: string;
    // labels?: string[];
    // stacked?: boolean;
    // position?: string;
    ticks: this.lineTickOptions,
    gridLines: this.lineGridLineOptions
    // scaleLabel?: ScaleTitleOptions;
    // time?: TimeScale;
    // offset?: boolean;
    // beforeUpdate?(scale?: any): void;
    // beforeSetDimension?(scale?: any): void;
    // beforeDataLimits?(scale?: any): void;
    // beforeBuildTicks?(scale?: any): void;
    // beforeTickToLabelConversion?(scale?: any): void;
    // beforeCalculateTickRotation?(scale?: any): void;
    // beforeFit?(scale?: any): void;
    // afterUpdate?(scale?: any): void;
    // afterSetDimension?(scale?: any): void;
    // afterDataLimits?(scale?: any): void;
    // afterBuildTicks?(scale: any, ticks: number[]): number[];
    // afterTickToLabelConversion?(scale?: any): void;
    // afterCalculateTickRotation?(scale?: any): void;
    // afterFit?(scale?: any): void;
  }
  lineTickOptionsX = {
    // minor?: NestedTickOptions | false;
    // major?: MajorTickOptions | false;
    // autoSkip?: boolean;
    // autoSkipPadding?: number;
    // backdropColor?: ChartColor;
    // backdropPaddingX?: number;
    // backdropPaddingY?: number;
    beginAtZero:true,
    /**
     * If the callback returns null or undefined the associated grid line will be hidden.
     */
    // callback?(value: number | string, index: number, values: number[] | string[]): string | number | null | undefined;
    // display?: boolean;
    fontColor: '#985f0d',
    fontFamily: 'sans-sherif',
    fontSize: 22,
    fontStyle: 'bold',
    // labelOffset?: number;
    // lineHeight?: number;
    // max: 300,
    // maxRotation?: number;
    // maxTicksLimit?: number;
    // min: 0,
    // minRotation?: number;
    // mirror?: boolean;
    // padding?: number;
    // precision?: number;
    // reverse?: boolean;
    /**
     * The number of ticks to examine when deciding how many labels will fit.
     * Setting a smaller value will be faster, but may be less accurate
     * when there is large variability in label length.
     * Deault: `ticks.length`
     */
    // sampleSize?: number;
    // showLabelBackdrop?: boolean;
    // source?: 'auto' | 'data' | 'labels';
    // stepSize: 5,
    // suggestedMax?: number;
    // suggestedMin?: number;
  }
  lineGridLineOptionsX = {
    // display?: boolean;
    // circular?: boolean;
    color: '#985f0d',
    // borderDash?: number[];
    // borderDashOffset?: number;
    lineWidth: 1
    // drawBorder?: boolean;
    // drawOnChartArea?: boolean;
    // drawTicks?: boolean;
    // tickMarkLength?: number;
    // zeroLineWidth?: number;
    // zeroLineColor?: ChartColor;
    // zeroLineBorderDash?: number[];
    // zeroLineBorderDashOffset?: number;
    // offsetGridLines?: boolean;
    // z?: number;
  }
  lineTimeDisplayFormatX = {
    millisecond: 'YYYY-MM-DD HH:mm:ss',
    second: 'YYYY-MM-DD HH:mm:ss',
    minute: 'YYYY-MM-DD HH:mm:ss',
    hour: 'YYYY-MM-DD HH:mm:ss',
    day: 'YYYY-MM-DD HH:mm:ss',
    week: 'YYYY-MM-DD HH:mm:ss',
    month: 'YYYY-MM-DD HH:mm:ss',
    quarter: 'YYYY-MM-DD HH:mm:ss',
    year: 'YYYY-MM-DD HH:mm:ss'
  }
  lineTimeUnit: TimeUnit = 'hour';
  lineTimeScaleX = {
    // type?: ScaleType | string;
    // display?: boolean;
    // position?: PositionType | string;
    // gridLines?: GridLineOptions;
    // scaleLabel?: ScaleTitleOptions;
    // ticks?: TickOptions;
    // xAxes?: ChartXAxe[];
    // yAxes?: ChartYAxe[];
    // adapters?: DateAdapterOptions;
    displayFormats: this.lineTimeDisplayFormatX,
    // isoWeekday?: boolean;
    // max?: string;
    // min?: string;
    // parser?: string | ((arg: any) => any);
    // round?: TimeUnit;
    // tooltipFormat?: string;
    unit: this.lineTimeUnit,
    // unitStepSize?: number;
    stepSize: 1,
    // minUnit?: TimeUnit;
  }
  currentDistribution: DistributionNative = 'series';
  lineChartXAxe = {
    distribution: this.currentDistribution,//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // bounds?: string;
    type: 'time',//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // display?: boolean | string;
    // id?: string;
    // labels?: string[];
    // stacked?: boolean;
    // position?: string;
    ticks: this.lineTickOptionsX,//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    gridLines: this.lineGridLineOptionsX,//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // scaleLabel?: ScaleTitleOptions;
    time: this.lineTimeScaleX,//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // offset?: boolean;
    // beforeUpdate?(scale?: any): void;
    // beforeSetDimension?(scale?: any): void;
    // beforeDataLimits?(scale?: any): void;
    // beforeBuildTicks?(scale?: any): void;
    // beforeTickToLabelConversion?(scale?: any): void;
    // beforeCalculateTickRotation?(scale?: any): void;
    // beforeFit?(scale?: any): void;
    // afterUpdate?(scale?: any): void;
    // afterSetDimension?(scale?: any): void;
    // afterDataLimits?(scale?: any): void;
    // afterBuildTicks?(scale: any, ticks: number[]): number[];
    // afterTickToLabelConversion?(scale?: any): void;
    // afterCalculateTickRotation?(scale?: any): void;
    // afterFit?(scale?: any): void;
  }
  lineChartScales = {
    // type?: ScaleType | string;
    // display: true,
    // position?: PositionType | string;
    // gridLines?: GridLineOptions;
    // scaleLabel?: ScaleTitleOptions;
    // ticks?: TickOptions;
    xAxes: [this.lineChartXAxe],//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    yAxes: [this.lineChartYAxe]//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
    tooltips: this.lineChartTooltipOptions,
    hover: this.lineChartHoverOptions,
    animation: this.lineChartAnimationOptions,
    elements: this.lineChartElementsOptions,
    layout: this.lineChartLayoutOptions,
    // scale?: RadialLinearScale;
    scales: this.lineChartScales,//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    showLines: true,
    spanGaps: true,//If true, lines will be drawn between points with no or null data. If false, points with NaN data will create a break in the line
    // cutoutPercentage?: number;
    // circumference?: number;
    // rotation?: number;
    // devicePixelRatio?: number;
    // plugins?: ChartPluginsOptions;
    // defaultColor?: ChartColor;
  }
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,255,0,0.28)',
      // borderWidth?: number | number[];
      borderColor: 'black',
      // borderCapStyle?: string;
      // borderDash?: number[];
      // borderDashOffset?: number;
      // borderJoinStyle?: string;
      // pointBorderColor?: string | string[];
      // pointBackgroundColor?: string | string[];
      // pointBorderWidth?: number | number[];
      // pointRadius?: number | number[];
      // pointHoverRadius?: number | number[];
      // pointHitRadius?: number | number[];
      // pointHoverBackgroundColor?: string | string[];
      // pointHoverBorderColor?: string | string[];
      // pointHoverBorderWidth?: number | number[];
      // pointStyle?: string | string[];
      // hoverBackgroundColor?: string | string[];
      // hoverBorderColor?: string | string[];
      // hoverBorderWidth?: number;
    },
  ];
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  lineChartLegend = true;
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  lineChartPlugins = [];
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  lineChartType: ChartType = 'line';
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/


  constructor(private webSocketAPI: WebsocketServiceService,
              private bodyMessage: MessageService,
              private window: Window,
              baseChart: ElementRef) {
    this.baseChart = baseChart;
    this.webSocketAPI._connect();

    this.currentDateTime = this.readCurrentDateTime();

    // saveAs(new Blob(), "dd");

    bodyMessage.messageStream$.subscribe(mes => {this.addMessage(mes);});
    bodyMessage.dateStream$.subscribe( mes => {this.writeDateTimeFromServer(mes);});

  }


  ngOnInit() {}

  ngAfterViewInit(){}

  sendNameAndTimeItem(){}

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
    this.rangeDate.start = this.start;
    this.rangeDate.end = this.end;
    this.webSocketAPI._sendDate(this.rangeDate);
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


  public genChart(data: any): void{
    let x: Array<string> = [];
    let y1: Array<number> = [];
    let y2: Array<number> = [];
    let utcLocalDateTimeOffset = this.getUtcOffset(data[0]["date"]);
    for (let i: number=0; i < data.length; i++){
      if (data.hasOwnProperty(i)){
        try {
          x[i] = moment(data[i]["date"], "YYYY,MM,DD,HH,mm,ss").utcOffset(utcLocalDateTimeOffset).toDate().toString();
          y1[i] = data[i]["holdingRegister0"];
          y2[i] = data[i]["holdingRegister1"];
        }catch (err){
          console.log('Ошибка ' + err.name + ":" + err.message + "\n" + err.stack);
        }
      }
    }
    this.globalX = x;
    this.globalY1 = y1;
    this.globalY2 = y2;
    this.increaseDecriaseZoom = 0;
    this.leftRightPosition = 0;
    this.buildChart(x, y1, y2);
  }

  public buildChart(x: Array<string>, y1: Array<number>, y2: Array<number>) {
    this.lineChartLabels = x;
    this.lineChartData[0].data = y1;
    this.lineChartData[1].data = y2;
    // this.window.myChart.update();
  }

  public clearChart(){
    this.globalX = [];
    this.globalY1 = [];
    this.globalY2 = [];
    this.lineChartLabels = [];
    this.lineChartData.forEach(function(dataset) {
      dataset.data = [];
    });
    // this.window.myLine.update();
  }

  public addLastElementToChart(X1: string, Y1: number, Y2: number) {
    this.globalX.push(X1);
    this.globalY1.push(Y1);
    this.globalY2.push(Y2);
    this.lineChartLabels.push(X1);
    // this.lineChartData[0].data.push(Y1);
    this.dataLegend1.push(Y1);
    // this.lineChartData[1].data.push(Y1);
    this.dataLegend2.push(Y2);
    // this.window.myLine.update();
  }

  public removeFirstElementFromChart() {
    this.globalX.shift();
    this.globalY1.shift();
    this.globalY2.shift();
    this.lineChartLabels.shift();
    this.dataLegend1.shift();
    this.dataLegend2.shift();
    // this.lineChartData.forEach(function(dataset) {
    //   dataset.data.shift();
    // });
    // window.myLine.update();
  }

  public drawInRealTime(parsed: any) {
    let x = moment(new Date(), "YYYY-MM-DD HH:mm:ss").toDate().toString();
    let y1 = parsed.holdingRegister0;
    let y2 = parsed.holdingRegister1;
    if (this.lineChartLabels.length < this.bufferChart){
      this.addLastElementToChart(x, y1, y2);
    }
    if (this.lineChartLabels.length >= this.bufferChart){
      this.removeFirstElementFromChart();
    }
  }

  public increaseChart() {
    let increaseArrayX = [];
    let increaseArrayY1 = [];
    let increaseArrayY2 = [];
    if ((0 < this.increaseDecriaseZoom - this.leftRightPosition) || (this.globalX.length > this.increaseDecriaseZoom - this.leftRightPosition)){
      this.increaseDecriaseZoom = this.increaseDecriaseZoom + Number(this.zoomChart);
      let from = this.increaseDecriaseZoom - this.leftRightPosition;
      let to = this.globalX.length - this.increaseDecriaseZoom - this.leftRightPosition;
      increaseArrayX = this.globalX.slice(from,to);
      increaseArrayY1 = this.globalY1.slice(from,to);
      increaseArrayY2 = this.globalY2.slice(from,to);
      this.generateNewChartTitle(increaseArrayX[0], increaseArrayX[increaseArrayX.length - 1]);
      this.buildChart(increaseArrayX, increaseArrayY1, increaseArrayY2);
    }
  }

  public decreaseChart() {
    let increaseArrayX = [];
    let increaseArrayY1 = [];
    let increaseArrayY2 = [];
    if ((0 < this.increaseDecriaseZoom - this.leftRightPosition) || (this.globalX.length > this.increaseDecriaseZoom - this.leftRightPosition)){
      this.increaseDecriaseZoom = this.increaseDecriaseZoom - Number(this.zoomChart);
      let from = this.increaseDecriaseZoom - this.leftRightPosition;
      let to = this.globalX.length - this.increaseDecriaseZoom - this.leftRightPosition;
      increaseArrayX = this.globalX.slice(from,to);
      increaseArrayY1 = this.globalY1.slice(from,to);
      increaseArrayY2 = this.globalY2.slice(from,to);
      this.generateNewChartTitle(increaseArrayX[0], increaseArrayX[increaseArrayX.length - 1]);
      this.buildChart(increaseArrayX, increaseArrayY1, increaseArrayY2);
    }
  }

  public leftChart() {
    let increaseArrayX = [];
    let increaseArrayY1 = [];
    let increaseArrayY2 = [];
    if ((0 < this.increaseDecriaseZoom - this.leftRightPosition) || (this.globalX.length > this.increaseDecriaseZoom - this.leftRightPosition)){
      this.leftRightPosition = this.leftRightPosition + Number(this.zoomChart);
      let from = this.increaseDecriaseZoom - this.leftRightPosition;
      let to = this.globalX.length - this.increaseDecriaseZoom - this.leftRightPosition;
      increaseArrayX = this.globalX.slice(from,to);
      increaseArrayY1 = this.globalY1.slice(from,to);
      increaseArrayY2 = this.globalY1.slice(from,to);
      this.generateNewChartTitle(increaseArrayX[0], increaseArrayX[increaseArrayX.length - 1]);
      this.buildChart(increaseArrayX, increaseArrayY1, increaseArrayY2);
    }
  }

  public rightChart() {
    let increaseArrayX = [];
    let increaseArrayY1 = [];
    let increaseArrayY2 = [];
    if ((0 < this.increaseDecriaseZoom - this.leftRightPosition) || (this.globalX.length > this.increaseDecriaseZoom - this.leftRightPosition)){
      this.leftRightPosition  = this.leftRightPosition  - Number(this.zoomChart);
      let from = this.increaseDecriaseZoom - this.leftRightPosition;
      let to = this.globalX.length - this.increaseDecriaseZoom - this.leftRightPosition;
      increaseArrayX = this.globalX.slice(from,to);
      increaseArrayY1 = this.globalY1.slice(from,to);
      increaseArrayY2 = this.globalY2.slice(from,to);
      this.generateNewChartTitle(increaseArrayX[0], increaseArrayX[increaseArrayX.length - 1]);
      this.buildChart(increaseArrayX, increaseArrayY1, increaseArrayY2);
    }
  }

  public saveChart() {
    this.baseChart.nativeElement.toBlob(function(blob: any) {
      let dt = moment().format("YYYY-MM-DD HH:mm:ss");
      saveAs(blob, dt+"_chart");
    });
  }

  public getUtcOffset(date: Date) {
    let minutesOffset = moment(date, "YYYY,MM,DD,HH,mm,ss").parseZone().utcOffset();
    let hoursOffset = minutesOffset/60;
    return minutesOffset;
  }

}
