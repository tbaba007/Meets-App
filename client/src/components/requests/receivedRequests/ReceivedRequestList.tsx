import React, { useState, useEffect } from "react";
import {
  GetReceivedRequestsById,
  JoinEvent,
  UnJoin,
} from "../../../api/services/events";
import { AppColors, getUser } from "../../../helper/common";
import Header from "../../Header";
import { LayoutContainer } from "../../layout";
import Sidebar from "../../sidebar";
import { ReceivedRequestListContainer } from "../sentRequests/styles";
import { IRequestProps } from "../sentRequests/types";
import { Requester } from "./styles";
import RequesterDetails from "./requesterDetails";
import ButtonUi from "../../ui/button/button";
import { toast, ToastContainer } from "react-toastify";

const today = new Date();
const ReceivedRequestList = () => {
  const [receivedRequestList, setReceivedRequestList] = useState<
    IRequestProps[]
  >([]);
  const [userDetails, setUserDetails] = useState<IRequestProps>();
  const [selectedId, setSelectedId] = useState(0);
  const [updateId, setUpdateId] = useState("");
  document.title = "Received Request List";

  useEffect(() => {
    const getReceivedRequests = async () => {
      const data: IRequestProps[] = await GetReceivedRequestsById(
        getUser().StudentId
      );
      setReceivedRequestList(data);
    };
    getReceivedRequests();
  }, [updateId]);

  const onRequesterClick = (item: IRequestProps, id: number) => {
    if (id === selectedId) {
      setSelectedId(-1);
      setUserDetails(null!!);
      return;
    }
    setSelectedId(id);
    setUserDetails(item);
  };

  const isEventPassed = (item: IRequestProps): boolean => {
    const startDate = new Date(item.StartDate);
    const endDate = new Date(item.EndDate);
    const endTime = new Date(item.EndTime).getTime();
    if (
      startDate <= today &&
      endDate > today &&
      !item.Acceptedids?.includes(item.StudentId.toString())
    ) {
      return true;
    }
    if (
      startDate <= today &&
      endDate === today &&
      endTime > today.getTime() &&
      !item.Acceptedids?.includes(item.StudentId.toString())
    ) {
      return true;
    }

    return false;
  };

  const onAccept = async ({
    StudentId,
    Acceptedids,
    MarketPlaceId,
  }: IRequestProps) => {
    if (window.confirm("Are you sure you want to accept?")) {
      debugger;
      const acceptedIds = Acceptedids?.split(",") as string[];
      if (acceptedIds?.length > 0) {
        const ids = [...acceptedIds, StudentId].join(",");
        const accept = await JoinEvent(MarketPlaceId!!, ids);
        if (accept) {
          setUpdateId(`${MarketPlaceId}accept`);
          toast.success("Event accepted successfully");
        }
        else{
          toast.error('An error occurred ');
        }
      } else {
        const accept = await JoinEvent(MarketPlaceId!!, StudentId.toString());
        if(accept){
          setUpdateId(`${MarketPlaceId}accept`);
          toast.success("Event accepted successfully");
        }
        else{
          toast.error('An error occurred ');
        }
      
      }
    }
  };

  const onReject = async(item: IRequestProps) => {
    if (window.confirm("Are you sure you want to reject?")) {
      const inviteesIds = item.InviteesIds.replace("{", "")
        .replace("}", "")
        .replace('"', "")
        .replaceAll('"', "")
        .split(",");
        const studentId=getUser().StudentId;
        const userIndex=inviteesIds.findIndex(x=>x===studentId)
      const removeId=inviteesIds.splice(userIndex,0).join();
      const isRejected=await UnJoin(item.MarketPlaceId!!,removeId);
      if(isRejected){
        setUpdateId(`${item.MarketPlaceId}rejected`);
        toast.success('Event rejected successfully');
      }
      else{
        toast.error('An error occurred ');
      }
    }
  };
  return (
    <LayoutContainer>
      <Sidebar />
      <Header />
      <ReceivedRequestListContainer>
        <thead>
          <tr>
            <th>SN</th>
            <th>Requester</th>
            <th>Event Title</th>
            <th>Sport</th>
            <th>Start Date</th>
            <th>Start Time</th>
            <th>End Date</th>
            <th>End Time</th>
          </tr>
        </thead>

        <tbody>
          {receivedRequestList.length > 0 &&
            receivedRequestList.map((item, index) => {
              return (
                <>
                  <tr key={item.UserId}>
                    <td>{index + 1}</td>
                    <td>
                      <Requester onClick={() => onRequesterClick(item, index)}>
                        {item.FirstName}&nbsp;{item.LastName}
                      </Requester>
                    </td>
                    <td>{item.Title}</td>
                    <td>{item.sport}</td>
                    <td>{item.StartDate}</td>
                    <td>{item.StartTime}</td>
                    <td>{item.EndDate}</td>
                    <td>{item.EndTime}</td>
                    <td>
                      {isEventPassed(item) && (
                        <>
                          <ButtonUi
                            height="50px"
                            width="100px"
                            onClick={() => onAccept(item)}
                            backgroundColor={AppColors[0].value}
                            children={<p>Accept</p>}
                          />
                          &nbsp;
                          <ButtonUi
                            height="50px"
                            width="100px"
                            onClick={() => onReject(item)}
                            backgroundColor={AppColors[1].value}
                            children={<p>Reject</p>}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                  {selectedId === index && userDetails?.FirstName && (
                    <RequesterDetails key={item.MarketPlaceId} {...item} />
                  )}
                </>
              );
            })}
          <tr>{receivedRequestList.length < 1 && <td>No Request Found</td>}</tr>
        </tbody>
      </ReceivedRequestListContainer>
      <ToastContainer />
    </LayoutContainer>
  );
};

export default ReceivedRequestList;
