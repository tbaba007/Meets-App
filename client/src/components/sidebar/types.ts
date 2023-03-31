export interface ISideBarProps{
    id?:number | 0;
    title?:string;
    icon?:string;
    path?:string;
    isSubMenu?:boolean;
    subMenuIcon?:string;
    subMenuList?:dropDownMenu[];
}

type dropDownMenu={
    path:string,
    name:string
}