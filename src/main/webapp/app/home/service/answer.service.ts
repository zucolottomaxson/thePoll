import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IAnswer } from 'app/entities/answer/answer.model';
import { IChartData } from 'app/entities/chart-data/chart-data.model';

@Injectable({ providedIn: 'root' })
export class AnswerService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/answer');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(answer: IAnswer): Observable<IAnswer> {
    return this.http.post<IAnswer>(this.resourceUrl, answer);
  }

  findById(id: number): Observable<IAnswer>{
      return this.http.get<IAnswer>(`${this.resourceUrl}/${id}`);
  }

  findChartDataByPollId(id: number): Observable<any>{
    return this.http.get<any>(`${this.resourceUrl}/chart/${id}`);
  }
}
