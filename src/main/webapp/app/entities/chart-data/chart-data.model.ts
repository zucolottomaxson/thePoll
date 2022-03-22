export interface IChartData{
    key?:string;
    value?:number;
}

export class ChartData implements IChartData{
    constructor(
        public key?:string,
        public value?:number,
    ){}
}