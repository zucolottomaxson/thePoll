export interface IPoll{
    id?:number;
    title?:string;
    description?:string;
    createdDate?:Date;
    options?:string[];
    needLogin?:boolean;
    hash?:string
}

export class Poll implements IPoll{
    constructor(
        public id?:number,
        public title?:string,
        public description?:string,
        public createdDate?:Date,
        public options?:string[],
        public needLogin?:boolean,
        public hash?:string
    ){}
}