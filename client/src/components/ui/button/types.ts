export interface IButtonProps{
    onClick?:(params:any)=>void | any;
    text?:string;
    children?:JSX.Element;
    width?:string;
    height?:string;
    backgroundColor?:string;
    isDisabled?:boolean
}