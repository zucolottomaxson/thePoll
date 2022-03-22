export interface IAnswer{
    id?:number,
    userId?:number,
    createdDate?:Date,
    pollId?:number,
    needLogin?:boolean,
    selectedOption?:string
}

export class Answer implements IAnswer{
    constructor(
        public id?:number,
        public userId?:number,
        public createdDate?:Date,
        public pollId?:number,
        public needLogin?:boolean,
        public selectedOption?:string
    ){}
}