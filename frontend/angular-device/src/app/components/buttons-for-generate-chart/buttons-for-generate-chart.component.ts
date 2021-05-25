import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as moment from "moment";
import {saveAs} from "file-saver";
import {GraphicsService} from "../../services/graphics.service";
import {RangeDateTimeWithZone} from "../../model/RangeDateTimeWithZone";
import {WebsocketServiceService} from "../../services/websocket-service.service";

@Component({
  selector: 'app-buttons-for-generate-chart',
  templateUrl: './buttons-for-generate-chart.component.html',
  styleUrls: ['./buttons-for-generate-chart.component.css']
})
export class ButtonsForGenerateChartComponent implements OnInit {
  public rangeDate: RangeDateTimeWithZone = new RangeDateTimeWithZone(new Date, new Date);
  @ViewChild("baseChart") baseChart: ElementRef;

  @Input() onChangeInputStart: Date = new Date();
  @Input() onChangeInputEnd: Date = new Date();

  constructor(private graphics: GraphicsService,
              private webSocketAPI: WebsocketServiceService,
              baseChart: ElementRef,) {
    this.baseChart = baseChart;
  }

  ngOnInit(): void {
  }

  public sendChartBody(): void{
    this.rangeDate.start = this.onChangeInputStart;
    this.rangeDate.end = this.onChangeInputEnd;
    this.webSocketAPI.sendRangeDateForChart(this.rangeDate);
  }

  public saveChart() {
    this.baseChart.nativeElement.toBlob(function(blob: any) {
      let dt = moment().format("YYYY-MM-DD HH:mm:ss");
      saveAs(blob, dt+"_chart");
    });
  }

  public clearChart() {
    this.graphics.clearChart();
  }

}
