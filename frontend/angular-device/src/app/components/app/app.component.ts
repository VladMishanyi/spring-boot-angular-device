import {AfterViewInit, Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {WebsocketServiceService} from "../../services/websocket-service.service";
import * as moment from "moment";
import { saveAs } from 'file-saver';
import {GraphicsService} from "../../services/graphics.service";
import {RangeDateTimeWithZone} from "../../model/RangeDateTimeWithZone";
import {BaseChartDirective, ChartsModule, Color, Label, ThemeService} from "ng2-charts";
import {ChartDataSets, ChartType, Easing, InteractionMode, PointStyle, PositionType, TimeUnit} from "chart.js";
import {TableModelMB110_1TD} from "../../model/TableModel";

type AxisNative = 'x' | 'y' | 'xy';
type DistributionNative = 'linear' | 'series';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AppComponent implements OnInit, AfterViewInit{
  public title: string = 'Reometr';
  public start: Date = new Date();
  public end: Date = new Date();
  public rangeDate: RangeDateTimeWithZone = new RangeDateTimeWithZone(new Date, new Date);

  public startChart: Date = new Date();
  public endChart: Date = new Date();
  public recipeName: string = 'empty';
  public recipeTime: number = 7;
  public vTitle: string[] = ['ITEM_NAME:  '+this.recipeName+'                                                            '+'ITEM_TIME:  '+this.recipeTime,
    'DATE_FROM:  '+moment(this.startChart).format('YYYY-MM-DD HH:mm:ss')+'               '+'DATE_TO:  '+moment(this.endChart).format('YYYY-MM-DD HH:mm:ss'),
    'RANGE_SEL:___________'+'               '+'ARC:___________'+'               '+'TEMP:___________'];
  public dataLegend1: number[] = [0];
  // public dataLegend2: number[] = [15, 42, 23, 102, 120, 48];

  public globalX: Date[] = [];
  public globalY1: number[] = [];
  // public globalY2: number[] = [];
  public increaseDecriaseZoom: number = 0;
  public leftRightPosition: number = 0;
  public bufferChart: number = 100000;
  public zoomChart: number = 10;
  public onDraw: boolean = false;

  @ViewChild("baseChart")
  refBaseChart: ElementRef;

  @ViewChild(BaseChartDirective)
  public refBaseChartDirective: BaseChartDirective;

  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  public lineChartData: ChartDataSets[] = [
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
      label: '??????????',
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
    /*
    ,
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
      label: '??????????????????????2',
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
     */
  ];
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  public lineChartLabels: Label[] =
    [
      moment().format('YYYY-MM-DD HH:mm:ss')/*,
      moment().add(20, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      moment().add(40, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      moment().add(60, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      moment().add(80, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      moment().add(100, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      moment().add(120, 'minute').format('YYYY-MM-DD HH:mm:ss')*/
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
    text: this.vTitle///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  lineTimeUnit: TimeUnit = 'minute';
  lineTimeScaleX = {
    // type: this.lineTimeUnit,
    // display: true,
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
    // unitStepSize: 1,
    stepSize: 1,
    // minUnit: this.lineTimeUnit
  }
  currentDistribution: DistributionNative = 'linear';
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
  public lineChartOptions = {
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
  public lineChartColors: Color[] = [
    // {
    // backgroundColor: 'rgba(255,255,0,0.28)',
    // borderWidth?: number | number[];
    // borderColor: 'black',
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
    // },
  ];
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  public lineChartLegend = true;
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  public lineChartPlugins = [];
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/
  public lineChartType: ChartType = 'line';
  /*------------------------------------------------------------------------------------------------------------------------------------------------------*/

  constructor(private webSocketAPI: WebsocketServiceService,
              private bodyMessage: MessageService,
              private graphics: GraphicsService,
              baseChart: ElementRef,
              private themeService: ThemeService,
              private window: Window) {
    this.refBaseChart = baseChart;
    this.refBaseChartDirective = new BaseChartDirective(this.refBaseChart, this.themeService);
  }

  ngOnInit() {
    this.webSocketAPI.connect();
    this.bodyMessage.listOfTable$.subscribe( mes => {
      this.genChart(mes);
    });
    this.bodyMessage.listOfDevicesByIdReceive$.subscribe( mes => {
      this.genChart(mes);
      this.recipeName = mes[0].recipe.name;
      this.recipeTime = mes[0].recipe.time;
      this.generateNewChartTitle();
    });
  }

  ngAfterViewInit() {
  }

  public connect() {
    this.webSocketAPI.connect();
  }

  public disconnect() {
    this.webSocketAPI.disconnect();
  }

  public saveChart(): void {
    // let dt = moment().format("YYYY-MM-DD HH:mm:ss");
    let dt = new Date();
    let name = this.recipeName;
    let time = this.recipeTime;
    this.refBaseChart.nativeElement.toBlob(function(blob: any) {
      saveAs(blob, dt+"____"+name+"____"+time);
    });
  }

  public sendChartBody(): void{
    this.rangeDate.start = this.start;
    this.rangeDate.end = this.end;
    this.webSocketAPI.sendRangeDateForChart(this.rangeDate);
  }

  public generateNewChartTitle(): void {
    this.lineChartTitleOptions.text.length = 0;
    let i: string[] = ['ITEM_NAME:  '+this.recipeName+'                                                            '+'ITEM_TIME:  '+this.recipeTime,
      'DATE_FROM:  '+moment(this.startChart).format('YYYY-MM-DD HH:mm:ss')+'               '+'DATE_TO:  '+moment(this.endChart).format('YYYY-MM-DD HH:mm:ss'),
      'RANGE_SEL:___________'+'               '+'ARC:___________'+'               '+'TEMP:___________'];
    this.lineChartTitleOptions.text.push(...i);
    this.updateGraphics();
  }

  public updateGraphics(): void{
    if(this.refBaseChartDirective !== undefined){
      this.refBaseChartDirective.ngOnDestroy();
      this.refBaseChartDirective.chart = this.refBaseChartDirective.getChartBuilder(this.refBaseChartDirective.ctx);
    }
  }

  public genChart(data: TableModelMB110_1TD[]): void{
    if (data.length > 0){
      let x: Date[] = [];
      let y1: number[] = [];
      let utcLocalDateTimeOffset = this.getUtcOffset(data[0].date);
      for (let i: number=0; i < data.length; i++){
        if (data.hasOwnProperty(i)){
          try {
            x[i] = moment(data[i].date, "YYYY-MM-DD HH:mm:ss").utcOffset(utcLocalDateTimeOffset).toDate();
            y1[i] = data[i].holdingRegister0;
          }catch (err){
            console.log('???????????? ' + err.name + ":" + err.message + "\n" + err.stack);
          }
        }
      }
      this.globalX.push(...x);
      this.globalY1.push(...y1);
      // this.globalY2 = y2;
      this.increaseDecriaseZoom = 0;
      this.leftRightPosition = 0;
      this.buildChart(x, y1/*, y2*/);
    }
  }

  public buildChart(x: Date[], y1: number[]/*, y2: number[]*/) {
    for (let i = 0; i < x.length -1; i++) {
      let s: string = x[i].toString();
      this.lineChartLabels.push(s);
    }
    // @ts-ignore
    this.lineChartData[0].data.push(...y1);
    // this.lineChartData[1].data = y2;
  }

  public clearChart(){
    this.increaseDecriaseZoom = 0;
    this.leftRightPosition = 0;
    this.globalX.length = 0;
    this.globalY1.length = 0;
    // this.globalY2 = [];
    this.lineChartLabels.length = 0;
    this.lineChartData.forEach(function(dataset) {
      // @ts-ignore
      dataset.data.length = 0;
    });
  }

  public refreshChart(){
    this.lineChartLabels.length = 0;
    this.lineChartData.forEach(function(dataset) {
      // @ts-ignore
      dataset.data.length = 0;
    });
  }

  public addLastElementToChart(X1: Date, Y1: number, Y2: number) {
    this.globalX.push(X1);
    this.globalY1.push(Y1);
    // this.globalY2.push(Y2);
    this.lineChartLabels.push(X1.toString());
    // this.lineChartData[0].data.push(Y1);
    this.dataLegend1.push(Y1);
    // this.lineChartData[1].data.push(Y1);
    // this.dataLegend2.push(Y2);
  }

  public removeFirstElementFromChart() {
    this.globalX.shift();
    this.globalY1.shift();
    // this.globalY2.shift();
    this.lineChartLabels.shift();
    this.dataLegend1.shift();
    // this.dataLegend2.shift();
    // this.lineChartData.forEach(function(dataset) {
    //   dataset.data.shift();
    // });
  }

  public drawInRealTime(parsed: any) {
    // let x = moment(new Date(), "YYYY-MM-DD HH:mm:ss").toDate();
    let x = new Date();
    let y1 = parsed.holdingRegister0;
    let y2 = parsed.holdingRegister1;
    if (this.lineChartLabels.length < this.bufferChart){
      this.addLastElementToChart(x, y1, y2);
    }
    if (this.lineChartLabels.length >= this.bufferChart){
      this.removeFirstElementFromChart();
    }
  }

  public increaseChart(): void {
    let incr: number = this.increaseDecriaseZoom + Number(this.zoomChart);
    this.checkIncreaseDecreaseRangeChart(incr);
  }

  public decreaseChart() {
    let decr: number = this.increaseDecriaseZoom - Number(this.zoomChart);
    if (this.leftRightPosition > 0) this.rightChart();
    if (this.leftRightPosition < 0) this.leftChart();
    this.checkIncreaseDecreaseRangeChart(decr);
  }

  public leftChart() {
    let left: number = this.leftRightPosition + Number(this.zoomChart);
    this.checkLeftRightRangeChart(left);
  }

  public rightChart() {
    let right: number = this.leftRightPosition  - Number(this.zoomChart);
    this.checkLeftRightRangeChart(right);
  }

  private checkIncreaseDecreaseRangeChart(increaseDecrease: number): void {
    let maxIndex: number = this.globalX.length-1;
    let from = increaseDecrease - this.leftRightPosition;
    let to = (this.globalX.length-1)  - increaseDecrease - this.leftRightPosition;
    if ((0 <= from) && (to <= maxIndex)) {
      let childMiddleIndex: number = (to + from)/2;
      if ((from < childMiddleIndex) && (childMiddleIndex < to)){
        this.increaseDecriaseZoom = increaseDecrease;
        this.zoomEventChart(from, to);
      }
    }
  }

  private checkLeftRightRangeChart(leftRight: number): void {
    let maxIndex: number = this.globalX.length-1;
    let from = this.increaseDecriaseZoom - leftRight;
    let to = (this.globalX.length-1)  - this.increaseDecriaseZoom - leftRight;
    if ((0 <= from) && (to <= maxIndex)) {
      let childMiddleIndex: number = (to + from)/2;
      if ((from < childMiddleIndex) && (childMiddleIndex < to)){
        this.leftRightPosition = leftRight;
        this.zoomEventChart(from, to);
      }
    }
  }

  private zoomEventChart(from: number, to: number): void {
      let increaseArrayX = [];
      let increaseArrayY1 = [];
      increaseArrayX = this.globalX.slice(from,to);
      increaseArrayY1 = this.globalY1.slice(from,to);
      this.startChart = increaseArrayX[0];
      this.endChart = increaseArrayX[increaseArrayX.length - 1];
      this.refreshChart();
      console.log("from:"+from+" to:"+to+" leftRight:"+this.leftRightPosition+" increaseDecrease:"+this.increaseDecriaseZoom);
      this.buildChart(increaseArrayX, increaseArrayY1);
      this.generateNewChartTitle();
  }

  public getUtcOffset(date: Date) {
    let minutesOffset = moment(date, "YYYY-MM-DD HH:mm:ss").parseZone().utcOffset();
    let hoursOffset = minutesOffset/60;
    return minutesOffset;
  }
}
