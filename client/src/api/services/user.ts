import { IUserProps } from "../../components/user/register/types";
import { GET,POST, PUT } from "../HttpRequestHelper"



export const GetAll= ()=>{
 return  GET({path:"users/GetAll"});
}

export const IsEmailExists=(email:string)=>{
  return GET({path:`users/CheckEmail/${email}`});
}

export const UserLogin = async(email:string,password:string)=>{
  return  POST({path:"users/auth",payload:{Email:email,Password:password}})
}

export const UpdateUser=(data:IUserProps)=>{
  return  PUT({path:`users/UpdateUser/${data.UserId}`,payload:{
    FirstName:data.FirstName,LastName:data.LastName,Mobile:data.Mobile
  }})
}
export const DisableUser=(id:number)=>{
  return PUT({path:`users/Disable/${id}`})
}

export const RegisterUser=(data:IUserProps)=>{
  debugger;
 return POST({path:`users/AddUser`,payload:data})
}