export interface IPollFilter{
    id?:number;
    title?:string;
    description?:string;
    createdDate?:Date;
    options?:string[];
    needLogin?:boolean;
    onlyMy?: boolean;
}

export class PollFilter implements IPollFilter{
    constructor(
        public id?:number,
        public title?:string,
        public description?:string,
        public createdDate?:Date,
        public options?:string[],
        public needLogin?:boolean,
        public onlyMy?: boolean
    ){}
}