import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GraphicsService} from "../../services/graphics.service";
import {AppComponent} from "../app/app.component";

@Component({
  selector: 'app-search-by-datetime-range',
  templateUrl: './search-by-datetime-range.component.html',
  styleUrls: ['./search-by-datetime-range.component.css']
})
export class SearchByDatetimeRangeComponent implements OnInit {
  public startChart: Date = new Date();
  public endChart: Date = new Date();

  @Output() onChangeOutputStart = new EventEmitter();
  @Output() onChangeOutputEnd = new EventEmitter();

  constructor(private graphics: AppComponent) {
    this.graphics.startChart = this.startChart;
    this.graphics.endChart = this.endChart;
  }

  ngOnInit(): void {
  }

  public valueChangeStartChart(valueStart: Date): void{
    this.onChangeOutputStart.emit(valueStart);
    this.graphics.startChart = valueStart;
    this.graphics.generateNewChartTitle();
  }

  public valueChangeEndChart(valueEnd: Date): void{
    this.onChangeOutputEnd.emit(valueEnd);
    this.graphics.endChart = valueEnd;
    this.graphics.generateNewChartTitle();
  }

}
