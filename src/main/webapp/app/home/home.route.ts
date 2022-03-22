import { Route, Routes } from '@angular/router';
import { AnswerComponent } from './answer/answer.component';

import { HomeComponent } from './home.component';
import { PollUpdateComponent } from './update/poll-update.component';

export const HOME_ROUTE: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      pageTitle: 'home.title',
    },
  },
  {
    path: 'new',
    component: PollUpdateComponent,
    data: {
      pageTitle: 'new poll',
    },
  },
  {
    path: 'edit/:pollId',
    component: PollUpdateComponent,
    data: {
      pageTitle: 'edit poll',
    },
  },
  {
    path: 'answer/:hash',
    component: AnswerComponent,
    data: {
      pageTitle: 'Answer the poll',
    },
  }

];
