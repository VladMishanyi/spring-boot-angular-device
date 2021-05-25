import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TableModelRecipe} from "../../model/TableModel";
import {WebsocketServiceService} from "../../services/websocket-service.service";
import {MessageService} from "../../services/message.service";
import {GraphicsService} from "../../services/graphics.service";
import {JsonNumber} from "../../model/JsonNumber";

@Component({
  selector: 'app-recipe-block',
  templateUrl: './recipe-block.component.html',
  styleUrls: ['./recipe-block.component.css']
})
export class RecipeBlockComponent implements OnInit, AfterViewInit {
  public recipe: TableModelRecipe = new TableModelRecipe(0, new Date, 'empty', 7);

  constructor(private webSocketAPI: WebsocketServiceService,
              private bodyMessage: MessageService,
              private graphics: GraphicsService) { }

  ngOnInit(): void {
    this.bodyMessage.recipeStatus$.subscribe( mes => {
      this.recipe.id = mes.id;
      this.recipe.date = mes.date;
      this.recipe.name = mes.name;
      this.recipe.time = mes.time;
      this.graphics.recipeName = mes.name;
      this.graphics.recipeTime = mes.time;
      this.graphics.generateNewChartTitle();
    });
    this.bodyMessage.recipeLastByDate$.subscribe( mes => {
      this.recipe.id = mes.id;
      this.recipe.date = mes.date;
      this.recipe.name = mes.name;
      this.recipe.time = mes.time;
      this.graphics.recipeName = mes.name;
      this.graphics.recipeTime = mes.time;
      this.graphics.generateNewChartTitle();
    });
  }

  ngAfterViewInit() {
    this.sendRecipeLastByDate(0);
  }

  public sendNameAndTimeItem(){
    this.webSocketAPI.sendRecipeItem(this.recipe);
  }

  public sendRecipeLastByDate(value: number): void {
    this.webSocketAPI.sendRecipeLastByDate(new JsonNumber(value));
  }

}
