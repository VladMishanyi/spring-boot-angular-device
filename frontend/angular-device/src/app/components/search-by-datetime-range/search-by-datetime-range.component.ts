import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GraphicsService} from "../../services/graphics.service";

@Component({
  selector: 'app-search-by-datetime-range',
  templateUrl: './search-by-datetime-range.component.html',
  styleUrls: ['./search-by-datetime-range.component.css']
})
export class SearchByDatetimeRangeComponent implements OnInit {
  public startChart: Date = new Date();
  public endChart: Date = new Date();

  @Output() onChangeStart = new EventEmitter();
  @Output() onChangeEnd = new EventEmitter();

  constructor(private graphics: GraphicsService) {
    this.graphics.startChart = this.startChart;
    this.graphics.endChart = this.endChart;
  }

  ngOnInit(): void {
  }

  public valueChangeStartChart(valueStart: Date): void{
    this.onChangeStart.emit(valueStart);
  }

  public valueChangeEndChart(valueEnd: Date): void{
    this.onChangeEnd.emit(valueEnd);
  }

}
