import { IEventProps } from "../../components/marketplace/types"
import { DELETE, GET, PATCH, POST } from "../HttpRequestHelper"


export const GetAllEvents =()=>{
    return GET({
        path:'marketplace/GetAll'
    })
}
export const AddEvent=(data:IEventProps)=>{
    return POST({
        path:'marketplace/AddNew',payload:data
    })
}

export const GetSentRequestsById=(id:number)=>{
    return GET({
        path:`marketplace/GetSentRequestById/${id}`
    })
}

export const GetAvailableEvents=()=>{
    return GET({
        path:`marketplace/GetAvailableEvents`
    })
}

export const JoinEvent=(MarketPlaceId:number,Acceptedids:string)=>{
    return PATCH({
        path:`marketplace/Join/${MarketPlaceId}`,payload:{Acceptedids}
    })
}

export const GetReceivedRequestsById=(id:number)=>{
    return GET({
        path:`marketplace/GetReceivedRequestById/${id}`
    })
}

export const GetGamesCount=(id:number)=>{
    return GET({
        path:`marketplace/GetGamesCountById/${id}`
    })
}

export const DeleteEventById=(id:number)=>{
    return DELETE({
        path:`marketplace/Delete/${id}`
    })
}

export const UnJoin=(id:number,inviteesId:string)=>{
    return PATCH({
        path:`marketplace/UnJoin/${id}`,
        payload:{inviteesId}
    })
}