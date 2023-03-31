import React,{useEffect,useState} from "react";
import { GetAllEvents } from "../../../api/services/events";
import { GetAll } from "../../../api/services/user";
import Header from "../../Header";
import { LayoutContainer } from "../../layout";
import { IEventProps } from "../../marketplace/types";
import SideBar from "../../sidebar/sidebar";
import Card from "../../ui/card";
import { IUserProps } from "../../user/register/types";
import { TopContainer } from "./styles";

const OverView = () => {
  document.title = "Overview";
  const [userCount,setUserCount]=useState(0);
  const [eventCount,setEventCount]=useState(0);
  const getUserCount= async()=>{
    const allUsers= await GetAll();
    return allUsers;
  }

  const getEventCount= async()=>{
    const allEvents=await GetAllEvents();
    return allEvents;
  }
  useEffect(()=>{
      Promise.all([getUserCount(),getEventCount()])
      .then(response=>{
        const eventList: IEventProps[] = response[1];
        const userList: IUserProps[] = response[0];
        setUserCount(userList.length);
        setEventCount(eventList.length);
      })
      
     
  },[])
  return (
    <LayoutContainer>
      <SideBar />
      <Header/>

      <TopContainer>
        <Card width="200px" height="100px" children={<p>Total Users <br/> <p>{userCount??0}</p></p>} />
        <Card width="200px" height="100px" children={<p>Events Count <br/> <p>{eventCount??0}</p></p>} />
      
      </TopContainer>
    </LayoutContainer>
  );
};

export default OverView;
