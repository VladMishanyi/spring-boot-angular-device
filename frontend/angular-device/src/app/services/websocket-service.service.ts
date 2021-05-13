// import * as Stomp from 'stompjs';
// import Stomp from 'stompjs';
// import { Client, Message, Stomp } from 'stompjs/lib/stomp.js';
// import * as SockJS from 'sockjs-client';
// import {  SockJS } from 'sockjs/lib/sockjs.js';
import {inject, Injectable} from '@angular/core';
import {MessageService} from "./message.service";
import {GraphicsService} from "./graphics.service";
declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
  webSocketEndPoint = 'http://localhost:8080/guide-websocket';
  topic = '/topic/greetings';
  topicLocalDateTime = '/topic/date-from-server';
  topicDeviceFromModbus = '/topic/table-model-mv110-1td';
  topicArrayTablesFromDatabase = '/topic/generate-chart-laboratory-reometr';
  sendChartDateRange = '/generate-chart-laboratory-reometr';
  sendHello: string = '/app/hello';
  sendDateRange: string = '/app/date-to-server';
  stompClient: any;

  constructor(private bodyMessage: MessageService, private graphics: GraphicsService) {

  }

  _connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);

    const entity = this;
    entity.stompClient.connect({}, function() {

      entity.stompClient.subscribe(entity.topic, function(sdkEvent: any) {
        entity.onMessageReceived(sdkEvent);
      });

      entity.stompClient.subscribe(entity.topicLocalDateTime, function(sdkEvent: any) {
        entity.onDateReceived(sdkEvent);
      });

      entity.stompClient.subscribe(entity.topicArrayTablesFromDatabase, function(sdkEvent: any) {
        entity.onListOfTablesReceive(sdkEvent);
      });

      entity.stompClient.subscribe(entity.topicDeviceFromModbus, function(sdkEvent: any) {
        entity.onModbusDeviceReceive(sdkEvent);
      });
      // entity.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: string) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message: any) {
    console.log('calling logout api via web socket');
    this.stompClient.send(this.sendHello, {}, JSON.stringify(message));
  }

  _sendRangeDateForChart(message: any) {
    console.log('calling logout api via web socket');
    this.stompClient.send(this.topicArrayTablesFromDatabase, {}, JSON.stringify(message));
    // this.stompClient.send('/app/date-to-server', {}, message);
  }

  onMessageReceived(message: any) {
    const mes = JSON.parse(message.body).content;
    this.bodyMessage.newMessage(mes);
  }

  onDateReceived(message: any) {
    const mes = JSON.parse(message.body);
    this.bodyMessage.newDate(mes);
  }

  onListOfTablesReceive(tables: any){
    const mes = JSON.parse(tables.body);
    this.graphics.genChart(mes);
    this.bodyMessage.newListOfTable(mes);
  }

  onModbusDeviceReceive(device: any){
    const mes = JSON.parse(device.body);
    if (this.graphics.onDraw) this.graphics.drawInRealTime(mes);
    this.bodyMessage.newDevice(mes);
  }
}
