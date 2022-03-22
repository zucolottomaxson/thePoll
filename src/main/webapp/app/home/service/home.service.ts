import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IPoll } from 'app/entities/poll/poll.model';
import { IPollFilter } from 'app/entities/poll/poll-filter.model';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private resourceUrl = this.applicationConfigService.getEndpointFor('api/poll');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(poll: IPoll): Observable<IPoll> {
    return this.http.post<IPoll>(this.resourceUrl, poll);
  }

  find(filter: IPollFilter): Observable<any>{
      return this.http.post<any>(`${this.resourceUrl}/filter`, filter);
  }

  findById(id: number): Observable<IPoll>{
      return this.http.get<IPoll>(`${this.resourceUrl}/${id}`);
  }

  findByHash(hash: string): Observable<any>{
    return this.http.get<IPoll>(`${this.resourceUrl}/hash/${hash}`);
  }

  associate(id: number): Observable<any>{
    return this.http.put<IPoll>(`${this.resourceUrl}/associate/${id}`,{});
  }
}
