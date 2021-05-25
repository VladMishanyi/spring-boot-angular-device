import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { FormsModule } from '@angular/forms';
import {BaseChartDirective, ChartsModule, ThemeService} from 'ng2-charts';
import { HeaderComponent } from './components/header/header.component';
import { CreationTimeComponent } from './components/creation-time/creation-time.component';
import { StretchingValueComponent } from './components/stretching-value/stretching-value.component';
import { InfoComponent } from './components/info/info.component';
import { ConnectorsComponent } from './components/connectors/connectors.component';
import { TitleComponent } from './components/title/title.component';
import { SearchByNameRecipeComponent } from './components/search-by-name-recipe/search-by-name-recipe.component';
import { SearchByDatetimeRangeComponent } from './components/search-by-datetime-range/search-by-datetime-range.component';
import { ButtonsForGenerateChartComponent } from './components/buttons-for-generate-chart/buttons-for-generate-chart.component';
import { NameOfChartComponent } from './components/name-of-chart/name-of-chart.component';
import { NavigationOfChartComponent } from './components/navigation-of-chart/navigation-of-chart.component';
import { RecipeBlockComponent } from './components/recipe-block/recipe-block.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreationTimeComponent,
    StretchingValueComponent,
    InfoComponent,
    ConnectorsComponent,
    TitleComponent,
    SearchByNameRecipeComponent,
    SearchByDatetimeRangeComponent,
    ButtonsForGenerateChartComponent,
    NameOfChartComponent,
    NavigationOfChartComponent,
    RecipeBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    { provide: Window, useValue: window },
    ThemeService,
    BaseChartDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
