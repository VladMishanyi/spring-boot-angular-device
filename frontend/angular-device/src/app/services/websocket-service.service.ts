import {Injectable} from '@angular/core';
import {MessageService} from "./message.service";
import {GraphicsService} from "./graphics.service";
declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
  webSocketEndPoint: string = 'http://localhost:8080/guide-websocket';
  topic: string = '/topic/greetings';
  topicLocalDateTime: string = '/topic/date-from-server';
  topicDeviceFromModbus: string = '/topic/table-model-mv110-1td';
  topicArrayTablesFromDatabase: string = '/topic/generate-chart-laboratory-reometr';
  topicMessageTimerStatus: string = '/topic/message-timer-status';
  topicMessageContactStatus: string = '/topic/message-contact-status';
  topicMessageTextStatus: string = '/topic/message-text-status';
  topicRecipeItem: string = '/topic/table-recipe';

  appChartDateRange: string = '/app/generate-chart-laboratory-reometr';
  appRecipeItem: string = '/app/table-recipe';

  stompClient: any;

  constructor(private bodyMessage: MessageService, private graphics: GraphicsService) {}

  connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);

    const entity = this;
    entity.stompClient.connect({}, function() {

      entity.stompClient.subscribe(entity.topicArrayTablesFromDatabase, function(sdkEvent: any) {
        entity.onListOfTablesReceive(sdkEvent);
      });

      entity.stompClient.subscribe(entity.topicDeviceFromModbus, function(sdkEvent: any) {
        entity.onModbusDeviceReceive(sdkEvent);
      });

      entity.stompClient.subscribe(entity.topicMessageTimerStatus, function(sdkEvent: any) {
        entity.onTimerStatusReceive(sdkEvent);
      });

      entity.stompClient.subscribe(entity.topicMessageContactStatus, function(sdkEvent: any) {
        entity.onContactStatusReceive(sdkEvent);
      });

      entity.stompClient.subscribe(entity.topicMessageTextStatus, function(sdkEvent: any) {
        entity.onTextStatusReceive(sdkEvent);
      });

      entity.stompClient.subscribe(entity.topicRecipeItem, function(sdkEvent: any) {
        entity.onTableRecipeReceive(sdkEvent);
      });
      // entity.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: string) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  sendRecipeItem(message: any) {
    this.stompClient.send(this.appRecipeItem, {}, JSON.stringify(message));
  }

  sendRangeDateForChart(message: any) {
    this.stompClient.send(this.appChartDateRange, {}, JSON.stringify(message));
  }

  onListOfTablesReceive(tables: any){
    const mes = JSON.parse(tables.body);
    this.bodyMessage.newListOfTable(mes);
  }

  onModbusDeviceReceive(device: any){
    const mes = JSON.parse(device.body);
    this.bodyMessage.newDevice(mes);
  }

  onTimerStatusReceive(timer: any){
    const mes = JSON.parse(timer.body);
    this.bodyMessage.newTimerStatus(mes);
  }

  onContactStatusReceive(contact: any){
    const mes = JSON.parse(contact.body);
    this.bodyMessage.newContactStatus(mes);
  }

  onTextStatusReceive(text: any){
    const mes = JSON.parse(text.body);
    this.bodyMessage.newTextStatus(mes);
  }

  onTableRecipeReceive(recipe: any){
    const mes = JSON.parse(recipe.body);
    this.bodyMessage.newRecipe(mes);
  }
}
