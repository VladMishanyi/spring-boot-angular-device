import { Component, OnInit } from '@angular/core';
import {JsonString} from "../../model/JsonString";
import {TableModelRecipe} from "../../model/TableModel";
import {MessageService} from "../../services/message.service";
import {JsonNumber} from "../../model/JsonNumber";
import {WebsocketServiceService} from "../../services/websocket-service.service";

@Component({
  selector: 'app-search-by-name-recipe',
  templateUrl: './search-by-name-recipe.component.html',
  styleUrls: ['./search-by-name-recipe.component.css']
})
export class SearchByNameRecipeComponent implements OnInit {
  public searchPattern: JsonString = new JsonString('');
  public listOfRecipesByNamePattern: TableModelRecipe[] = [];

  constructor(private bodyMessage: MessageService,
              private webSocketAPI: WebsocketServiceService) { }

  ngOnInit(): void {
    this.bodyMessage.recipeByNamePattern$.subscribe( mes => {
      this.listOfRecipesByNamePattern.length = 0;
      this.listOfRecipesByNamePattern.push(...mes);
    });
  }

  public sendGenerateChartByRecipeId(id: number): void{
    this.webSocketAPI.sendDeviceById(new JsonNumber(id));
  }

  public sendSearchPattern(){
    this.webSocketAPI.sendRecipeByNamePattern(this.searchPattern);
  }

}
