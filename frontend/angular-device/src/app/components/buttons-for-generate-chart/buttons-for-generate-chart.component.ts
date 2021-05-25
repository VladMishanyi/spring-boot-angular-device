import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as moment from "moment";
import {saveAs} from "file-saver";
import {GraphicsService} from "../../services/graphics.service";
import {RangeDateTimeWithZone} from "../../model/RangeDateTimeWithZone";
import {WebsocketServiceService} from "../../services/websocket-service.service";
import {any} from "codelyzer/util/function";

@Component({
  selector: 'app-buttons-for-generate-chart',
  templateUrl: './buttons-for-generate-chart.component.html',
  styleUrls: ['./buttons-for-generate-chart.component.css']
})
export class ButtonsForGenerateChartComponent implements OnInit {
  @Input()
  onChangeInputStart: Date = new Date();

  @Input()
  onChangeInputEnd: Date = new Date();

  constructor(private graphics: GraphicsService,
              private webSocketAPI: WebsocketServiceService,
              ) {}

  ngOnInit(): void {
  }

}
