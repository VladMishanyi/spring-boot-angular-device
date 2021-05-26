import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GraphicsService} from "../../services/graphics.service";
import {MessageService} from "../../services/message.service";
import {AppComponent} from "../app/app.component";

@Component({
  selector: 'app-navigation-of-chart',
  templateUrl: './navigation-of-chart.component.html',
  styleUrls: ['./navigation-of-chart.component.css']
})
export class NavigationOfChartComponent implements OnInit {
  public bufferChart: number = 100000;
  public zoomChart: number = 10;
  public onDraw: boolean = false;
  @ViewChild("checkboxOnRealTimeRender") realTimeRender: ElementRef;

  constructor(private graphics: AppComponent,
              realTimeRender: ElementRef,
              private bodyMessage: MessageService) {
    this.realTimeRender = realTimeRender;
    this.graphics.bufferChart = this.bufferChart;
    this.graphics.zoomChart = this.zoomChart;
  }

  ngOnInit(): void {
    this.bodyMessage.modbusDevice$.subscribe(mes => {
      if (this.onDraw) this.graphics.drawInRealTime(mes);
    });
    this.bodyMessage.timerStatus$.subscribe( mes => {
      this.onDraw = mes.content;
    });
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

}
