import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "app/core/auth/account.service";
import { LocalStorageService } from "app/core/util/local-storage.service";
import { Answer, IAnswer } from "app/entities/answer/answer.model";
import { IPoll, Poll } from "app/entities/poll/poll.model";
import { MessageService } from "primeng/api";
import { Subject, takeUntil } from "rxjs";
import { AnswerService } from "../service/answer.service";
import { HomeService } from "../service/home.service";

@Component({
    selector: 'jhi-answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit, OnDestroy {
    poll:IPoll = new Poll();

    answer: IAnswer = new Answer();

    selectedValue = '';

    myAnswerList: IAnswer[] = [];

    hash: any;

    private readonly destroy$ = new Subject<void>();

    constructor(private accountService: AccountService, private router: Router, private homeService: HomeService, private fb: FormBuilder, 
        private route: ActivatedRoute, private messageService: MessageService, private storage: LocalStorageService, private asnwerService: AnswerService) {}

        
    ngOnInit(): void {
        this.hash = this.route.snapshot.params.hash;
        if(this.hash){
            this.homeService.findByHash(this.hash).pipe().subscribe(response=>{
                this.poll = response;
                if(!response){
                    this.router.navigate(['']);
                }
                this.storage.set("hash-ativo", this.hash);
                if(this.isAnswered()){
                    this.answer = this.getAnswerBypoll(this.myAnswerList);
                }
            });
        }
       
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    save():void{
       this.answer.pollId = this.poll.id;
       this.asnwerService.create(this.answer)
       .pipe(takeUntil(this.destroy$))
       .subscribe(response=>{
           this.answer = response;
           this.messageService.add({severity:'success', summary:'Saved answer: ', detail:'Thanks for answering the poll'});
           this.storage.remove("hash-ativo");
           this.pushToReadList(this.myAnswerList, this.answer);
           this.router.navigate(['']);
       })
    }

    isAnswered():boolean{
        this.myAnswerList = this.storage.get('myAnswerList');
        if(!this.myAnswerList){
            return false;
        }
        return this.myAnswerList.some(p=>p.pollId === this.poll.id);
        
    }

    hasPermition():boolean{
        if(this.poll.needLogin){
            return this.accountService.isAuthenticated();
        }
        return true;
    }

    login(): void {
        this.router.navigate(['./login']);
    }

    private pushToReadList(myAnswerList: IAnswer[], answer: IAnswer ):void{
        if(!myAnswerList){
            myAnswerList = [];
        }
        myAnswerList.push(this.answer);
        this.storage.set('myAnswerList', myAnswerList);
    }

    private getAnswerBypoll(myAnswerList: IAnswer[]):any{
        return myAnswerList.find(a=>a.pollId = this.poll.id);
    }
    
}