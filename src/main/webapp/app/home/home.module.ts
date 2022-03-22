import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { PollUpdateComponent } from './update/poll-update.component';
import { AnswerComponent } from './answer/answer.component';
import { PollChartComponent } from './chart/poll-chart.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(HOME_ROUTE)],
  declarations: [HomeComponent, PollUpdateComponent, AnswerComponent, PollChartComponent],
  entryComponents: [PollChartComponent],
})
export class HomeModule {}
