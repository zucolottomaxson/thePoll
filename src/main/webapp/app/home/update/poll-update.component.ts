import { Clipboard } from "@angular/cdk/clipboard";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AccountService } from "app/core/auth/account.service";
import { Poll } from "app/entities/poll/poll.model";
import { MessageService } from "primeng/api";
import { concat, Subject, takeUntil } from "rxjs";
import { HomeService } from "../service/home.service";
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'jhi-poll-update',
    templateUrl: './poll-update.component.html',
    styleUrls: ['./poll-update.component.scss']
  })
export class PollUpdateComponent implements OnInit, OnDestroy {

    needLogin!: boolean;

    poll: Poll = new Poll();

    editForm = this.fb.group({
        id: [],
        title: ['', [Validators.maxLength(250), Validators.required]],
        description: ['', [Validators.maxLength(500)]],
    });

    items: MenuItem[] = [];

    home: MenuItem = {icon: 'pi pi-home', routerLink: '/'};

    private readonly destroy$ = new Subject<void>();

    constructor(private accountService: AccountService, private router: Router, private homeService: HomeService, private fb: FormBuilder, 
        private route: ActivatedRoute, private clipboard: Clipboard, private messageService: MessageService) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngOnInit(): void {
        const id = this.route.snapshot.params.pollId;
        let item: MenuItem =  {label: 'New poll'};
        if(id){
            item =  {label: 'Edit poll'}
            this.homeService.findById(id).pipe().subscribe(response=>{
                this.poll = response;
                this.buildForm(this.poll);
            });
        }
        this.items.push(item);
    }

    save():void{
        this.buildPoll();
        this.homeService.create(this.poll)
        .pipe(takeUntil(this.destroy$))
        .subscribe(response =>{
            this.poll = response;
        })
    }

    copy(link:any):void{
        const linkcompleto = "http://localhost:9000/answer/".concat(link);
        this.clipboard.copy(linkcompleto);
        this.messageService.add({severity:'success', summary:'Copied link: ', detail:linkcompleto});
    }

    private buildPoll():void{        
        this.poll.title = this.editForm.get(['title'])!.value;
        this.poll.description = this.editForm.get(['description'])!.value;
    }

    private buildForm(poll: Poll):void{
        this.editForm.patchValue({
            id: poll.id,
            title: poll.title,
            description: poll.description
        });
    }
    
}