import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "app/core/auth/account.service";
import { AppConfig } from "app/core/util/appconfig";
import { AppConfigService } from "app/core/util/appconfig.service";
import { LocalStorageService } from "app/core/util/local-storage.service";
import { IChartData } from "app/entities/chart-data/chart-data.model";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { Subject, Subscription } from "rxjs";
import { AnswerService } from "../service/answer.service";
import { HomeService } from "../service/home.service";

@Component({
    selector: 'jhi-poll-chart',
    templateUrl: './poll-chart.component.html',
    styleUrls: ['./poll-chart.component.scss']
})
export class PollChartComponent implements OnInit, OnDestroy {

    data: any;

    chartOptions: any;

    subscription: Subscription | undefined;

    config: AppConfig | undefined;

    private readonly destroy$ = new Subject<void>();

    constructor(private accountService: AccountService, private router: Router, private homeService: HomeService, 
        private route: ActivatedRoute, private messageService: MessageService, private storage: LocalStorageService, private asnwerService: AnswerService, 
        private configService: AppConfigService, private dynamicConfig: DynamicDialogConfig) {}


    ngOnInit(): void {
        const keys = this.dynamicConfig.data['keys'];
        const values = this.dynamicConfig.data['values'];


        this.buildChartData(values,keys);
        this.config = this.configService.config;
        this.updateChartOptions();
        this.subscription = this.configService.getConfigUpdate().subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.subscription?.unsubscribe();
    }

    updateChartOptions():void {
        this.chartOptions = this.getLightTheme();
        if(this.config?.dark){
            this.chartOptions = this.getDarkTheme();
        }
        //this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
    }

    getLightTheme():any {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        }
    }

    getDarkTheme():any {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            }
        }
    }

    private buildChartData(values:number[], keys:string[]):void{
        this.data = {
            labels: keys,
            datasets: [
                {
                    data: values,
                    backgroundColor: [
                        "#42A5F5",
                        "#66BB6A",
                        "#FFA726",
                        "#35c4dc",
                        "#f7b0d3",
                        "#f6de95"
                    ],
                    hoverBackgroundColor: [
                        "#64B5F6",
                        "#81C784",
                        "#FFB74D",
                        "#06b6d4",
                        "#f38ec0",
                        "#f2d066"
                    ]
                }
            ]
        };
    }
    
}