import { IEventProps } from "../types";

export interface IAvailableEventProps {
    FirstName:string;
    LastName:string;
    Location:string;
    Title:string;
    sport:string;
    NumberOfPlayers:number;
    StartDate:string;
    StartTime:string;
    remaining_count:number;
    acceptedcount:number;
    Acceptedids:string;
    EndDate:string;
    EndTime:string;
    MarketPlaceId:number;
    Description:string;

    RequesterId?:number;
    
}  
