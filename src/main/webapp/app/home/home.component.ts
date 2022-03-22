import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { IPoll } from 'app/entities/poll/poll.model';
import { HomeService } from './service/home.service';
import { IPollFilter, PollFilter } from 'app/entities/poll/poll-filter.model';
import {MenuItem, MessageService} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PollChartComponent } from './chart/poll-chart.component';
import { AnswerService } from './service/answer.service';
import { IChartData } from 'app/entities/chart-data/chart-data.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;

  polls: IPoll[] = [];

  totalRecords = 0;

  items: MenuItem[] = [{
    label: 'List of polls'
  }];

  onlyMy = false;

  filter: PollFilter = new PollFilter();

  home: MenuItem = {icon: 'pi pi-home', routerLink: '/'};

  resultData:IChartData[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router, private homeService: HomeService, public dialogService: DialogService, 
    private asnwerService: AnswerService, private messageService: MessageService ) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  loadData(event: any):any{
    this.homeService.find(this.filter).pipe().subscribe(response => {
      this.polls = response.content;
      this.totalRecords = response.totalElements;
    });
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChangeMyPolls(event:any):void{
    this.loadData(event);
  }

  show(poll: IPoll):void {
    this.getChartData(poll.id, poll.title);
  }

  associate(pollId:any):any{
    this.homeService.associate(pollId)
        .pipe()
        .subscribe({
          next:()=>{
            this.messageService.add({severity:'success', summary:'Success: ', detail:"Operation performed successfully"});
          },
          error:(error)=>{
            this.messageService.add({severity:'error', summary: 'Error: ', detail: error.error.title});
          }
        });
  }

  private openDialog(labels:any, data:any, title:any):void{
    const ref = this.dialogService.open(PollChartComponent, {
      data: {
        keys: labels,
        values: data
      },
      header: title,
      width: '70%'
  });
  }

  private getChartData(id:any, title:any):void{
    this.asnwerService.findChartDataByPollId(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(response=>{
      this.resultData = response;
      if(this.resultData.length<1){
        return;
      }
      this.openDialog(this.resultData.map(r=>r.key),this.resultData.map(r=>r.value), title);
    })
  }
}
