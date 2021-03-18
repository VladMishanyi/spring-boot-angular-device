// import * as Stomp from 'stompjs';
// import Stomp from 'stompjs';
// import { Client, Message, Stomp } from 'stompjs/lib/stomp.js';
// import * as SockJS from 'sockjs-client';
// import {  SockJS } from 'sockjs/lib/sockjs.js';
import {Injectable} from '@angular/core';
import {MessageService} from "./message.service";
declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
  webSocketEndPoint = 'http://localhost:8080/ws';
  topic = '/topic/greetings';
  stompClient: any;


  constructor(private bodyMessage: MessageService) {

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
    this.stompClient.send('/app/hello', {}, JSON.stringify(message));
  }

  onMessageReceived(message: any) {
    const mes = JSON.parse(message.body).content;
    this.bodyMessage.newMessage(mes);
  }
}
