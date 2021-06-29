import { Component, OnInit } from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'app-creation-time',
  templateUrl: './creation-time.component.html',
  styleUrls: ['./creation-time.component.css']
})
export class CreationTimeComponent implements OnInit {
  public currentDateTime: string;

  constructor() {
    this.currentDateTime = this.readCurrentDateTime();
  }

  ngOnInit(): void {
  }

  public readCurrentDateTime(): string{
    return  moment().format("YYYY-MM-DD HH:mm:ss");
  }

}
