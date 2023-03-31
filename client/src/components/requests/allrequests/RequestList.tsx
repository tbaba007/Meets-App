import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { DeleteEventById, GetAvailableEvents } from "../../../api/services/events";
import { AppColors } from "../../../helper/common";
import Header from "../../Header";
import { LayoutContainer } from "../../layout";
import { IAvailableEventProps } from "../../marketplace/availableevent/types";
import Sidebar from "../../sidebar";
import ButtonUi from "../../ui/button";
import { NoEventFound, SentRequestListContainer } from "../sentRequests/styles";

const Requestlist = () => {
  document.title="All Events"
  const [availableEventList, setAvailableEventList] = useState<
    IAvailableEventProps[]
  >([]);
  const [rand,setRand]=useState<number>(0);
  const getAvailableEvents = async () => {
    const data: IAvailableEventProps[] = await GetAvailableEvents();
    setAvailableEventList(data);
  };
  useEffect(() => {
    getAvailableEvents();
  }, [rand]);

  async function onDelete (id: number) {
    if(window.confirm('Are you sure you want to delete this event?')){
        const isEventDeleted=await DeleteEventById(id);
        if(isEventDeleted){
          toast.success('event deleted successfully');
          setRand(Math.floor(Math.random() * 15 ))
        }
      }
  }

  return (
<LayoutContainer>
    <Sidebar />
    <Header />
    <SentRequestListContainer>
      <thead>
        <tr>
          <th>SN</th>
          <th>Event Title</th>
          <th>Sport</th>
          <th>Start Date</th>
          <th>Start Time</th>
          <th>End Date</th>
          <th>End Time</th>
        </tr>
      </thead>

      <tbody>
        {availableEventList &&
          availableEventList.map((item, index) => {
            return (
              <>
                <tr key={item.MarketPlaceId}>
                  <td>{index + 1}</td>
                  <td>{item.Title}</td>
                  <td>{item.sport}</td>
                  <td>{item.StartDate}</td>
                  <td>{item.StartTime}</td>
                  <td>{item.EndDate}</td>
                  <td>{item.EndTime}</td>
                  <td>
                    <ButtonUi
                      backgroundColor={AppColors[1].value}
                      height="3em"
                      width="5em"
                      onClick={() => onDelete(item.MarketPlaceId!!)}
                      children={<label>Delete</label>}
                    />
                  </td>
                </tr>
              </>
            );
          })}
      </tbody>
      {availableEventList.length < 1 && (
        <NoEventFound>No Request Found</NoEventFound>
      )}
    </SentRequestListContainer>
    <ToastContainer />
  </LayoutContainer>
  )

  
};

export default Requestlist;
