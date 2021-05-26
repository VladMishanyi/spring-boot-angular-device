import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {ChartDataSets, ChartType, Easing, InteractionMode, PointStyle, PositionType, TimeUnit} from "chart.js";
import {BaseChartDirective, Color, Label} from "ng2-charts";
import * as moment from "moment";
import {saveAs} from "file-saver";
import {TableModelMB110_1TD, TableModelRecipe} from "../model/TableModel";
import {MessageService} from "./message.service";



@Injectable({
  providedIn: 'root'
})
export class GraphicsService {

}
