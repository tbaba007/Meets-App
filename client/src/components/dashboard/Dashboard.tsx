import React,{useEffect, useState} from "react";
import { GetGamesCount, GetReceivedRequestsById, GetSentRequestsById } from "../../api/services/events";
import { getMessage } from "../../helper/common";
import Header from "../Header";
import { LayoutContainer } from "../layout";
import { IEventProps } from "../marketplace/types";
import SideBar from "../sidebar";
import Card from "../ui/card";
import { DashBoardContainer, DashBoardScore, DashBoardScoreHeader } from "./styles";

const DashBoard = () => {
 const userDetails = getMessage("user")!!;
  const RequesterId = JSON.parse(userDetails).UserId;
  const StudentId=JSON.parse(userDetails).StudentId;
    document.title="DashBoard"
    const [requestSentCount,setRequestSentCount]=useState(0);
    const [requestReceivedCount,setRequestReceivedCount]=useState(0);
    const [gamesPlayedCount,setGamesPlayedCount]=useState(0);
    useEffect(()=>{
      const FetchData = async () => {
        const data= await Promise.all([GetSentRequestsById(RequesterId),GetReceivedRequestsById(StudentId),GetGamesCount(StudentId)]);
          const markePlaceRequests: IEventProps[] = data[0];
          const markePlaceReceivedRequests: IEventProps[] = data[1];
          const gamesReceivedCount: IEventProps[] = data[2];
          setRequestSentCount(markePlaceRequests.length);
          setRequestReceivedCount(markePlaceReceivedRequests.length)
          setGamesPlayedCount(gamesReceivedCount.length)
      };
      FetchData();
    },[RequesterId,StudentId])
  return (
    <LayoutContainer>
      <Header />
      <SideBar />
      <DashBoardContainer>

        <Card
          height="100px"
          width="200px"
          children={
            <>
              <DashBoardScoreHeader>No. Of Requests sent</DashBoardScoreHeader>
              <DashBoardScore>
                {requestSentCount}
              </DashBoardScore>
            </>
          }
        />
        <Card
          height="100px"
          width="200px"
          children={
            <>
              <DashBoardScoreHeader>
                No. Of Invite Received
              </DashBoardScoreHeader>
              <DashBoardScore>
                {requestReceivedCount}
              </DashBoardScore>
            </>
          }
        />
        <Card
          height="100px"
          width="200px"
          children={
            <>
              <DashBoardScoreHeader>No. Of Games Played</DashBoardScoreHeader>
              <DashBoardScore>
                {gamesPlayedCount}
              </DashBoardScore>
            </>
          }
        />
      </DashBoardContainer>
    </LayoutContainer>
  );
};

export default DashBoard;
