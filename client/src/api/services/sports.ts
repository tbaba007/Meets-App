import { GET, POST, PUT } from "../HttpRequestHelper"


export const GetAllSports=()=>{
    return GET({path:"sports/GetAll"})
}

export const AddSport=(name:string)=>{
    return POST({path:'sports/AddNew',payload:{Name:name}})
}

export const Deactivate=(sportId:number)=>{
    return PUT({path:`sports/Deactivate/${sportId}`})
}

export const Update=(sportId:number,name:string)=>{
    return PUT({path:`sports/Update/${sportId}`,payload:{Name:name}})
}