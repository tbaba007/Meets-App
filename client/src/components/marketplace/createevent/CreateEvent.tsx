import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AddEvent } from "../../../api/services/events";
import { GetAllSports } from "../../../api/services/sports";
import { GetAll } from "../../../api/services/user";
import { AppColors, getMessage } from "../../../helper/common";
import { ISportsProps } from "../../admin/sports/types";
import Header from "../../Header";
import { LayoutContainer } from "../../layout";
import SideBar from "../../sidebar";
import ButtonUi from "../../ui/button/button";
import Card from "../../ui/card";
import {
  RegisterInputFieldContainer,
  RegisterInputFieldHeader,
} from "../../user/register/styles";
import { IUserProps } from "../../user/register/types";
import { IEventProps } from "../types";
import SelectedPlayerList from "./SelectedPlayerList";
import {
  BtnAddContainer,
  Container,
  DisplayList,
  EventContainer,
  EventDate,
  EventDescriptionField,
  EventFieldsContainer,
  EventInputField,
  EventSelectField,
  EventTime,
} from "./styles";

const date = new Date();

const today = date.toISOString().split("T")[0];
const currentdate = new Date(); 
let currentTime = currentdate.getHours() + ":"  
                + currentdate.getMinutes()

const CreateEvent = () => {
  document.title = "Create Event";
  const userDetails = getMessage("user")!!;

  const RequesterId = JSON.parse(userDetails).UserId;
  const StudentId = JSON.parse(userDetails).StudentId;
  const [sportsArr, setSportsArr] = useState<ISportsProps[]>([]);
  const [userArr, setUserArr] = useState<IUserProps[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [state, setState] = useState<IEventProps>({
    StartDate: "",
    Description: "",
    InviteesId: [],
    Location: "",
    NumberOfPlayers: 0,
    RequesterId: RequesterId,
    SportsId: 0,
    Title: "",
    EndDate: "",
    StartTime: "",
    EndTime: "",
    MarketPlaceId:0
  });

  const [isEventOpen, setIsEventOpen] = useState(0);
  const [isEventCreated, setIsEventCreated] = useState(false);
  useEffect(() => {
    const FetchData = async () => {
      return await Promise.all([GetAll(), GetAllSports()]).then((response) => {
        const sportList: ISportsProps[] = response[1];
        const userList: IUserProps[] = response[0];
        setSportsArr(sportList);
        setUserArr(userList);
      });
    };
    FetchData();
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onAdd = () => {
    const { InviteesId, NumberOfPlayers } = state;
    if (NumberOfPlayers === 0) {
      return toast.error("Please Select Number Of Players First");
    }
    if (InviteesId.length === NumberOfPlayers) {
      return toast.error("Maximum Players Selected");
    }
    const playerList = [...InviteesId];
    if (InviteesId && InviteesId.length > 0) {
      //check if the selected player already exists
      const isPlayerExists = playerList.find((x) => x === selectedPlayer);
      if (!isPlayerExists) {
        const newPlayer = [...playerList, selectedPlayer];
        setState({
          ...state,
          InviteesId: newPlayer,
        });
      } else {
        toast.error("Player Already Selected");
      }
    } else {
      const newPlayer = [...playerList, selectedPlayer];
      setState({
        ...state,
        InviteesId: newPlayer,
      });
    }
  };

  const onPlayerRemove = (studentId: string) => {
    const { InviteesId } = state;
    const playerList = [...InviteesId];
    const index = playerList.findIndex((x) => x === studentId);
    playerList.splice(index, 1);
    setState({
      ...state,
      InviteesId: playerList,
    });
    toast.success(`${getUserByStaffId(studentId)} Removed Successfully`);
  };

  function getUserByStaffId(staffId: string) {
    const userDetails = userArr.find((x) => x.StudentId === staffId);

    return userDetails?.FirstName!! + " " + userDetails?.LastName;
  }

  const onCreate = async () => {
    debugger;
    const {
      Description,
      InviteesId,
      Title,
      Location,
      NumberOfPlayers,
      RequesterId,
      SportsId,
      EndDate,
      StartDate,
      StartTime,
      EndTime,
    } = state;

    if(!Title.trim()){
      return toast.error("Please Enter A Valid Title");
    }
    if(NumberOfPlayers===0){
      return toast.error("Please Select A Valid Number Of Players");
    }
    if(!Location.trim()){
      return toast.error("Please Enter A Valid Location");
    }
    if(!StartDate.trim()){
      return toast.error("Please Select A Valid Start Date");
    }
    if(!StartTime.trim()){
      return toast.error("Please Select A Valid StartTime");
    }
    if(!EndDate.trim()){
      return toast.error("Please Select A Valid EndDate");
    }
    if(!EndTime.trim()){
      return toast.error("Please Select A Valid EndTime");
    }
    if(!Description.trim()){
      return toast.error("Please Enter A Valid Description");
    }

    if(StartDate && EndDate){
      const startDate=new Date(StartDate)
      const endDate=new Date(EndDate);
      if(endDate<startDate){
       return toast.error("Start Date Cannot Be Greater Than End Date")
      }
    }

    //compare time
    if(EndTime && StartTime){
      if(StartDate===today){
        //check time
        if(currentTime>StartTime){
          return toast.error("Choose Later Time")
        }
      }
    }



    const data: IEventProps = {
      Description,
      InviteesId,
      Title,
      Location,
      NumberOfPlayers,
      RequesterId,
      SportsId,
      StartDate,
      EndDate,
      StartTime,
      EndTime,
    };

    const createEvent = await AddEvent(data);
    const { rowCount } = createEvent;
    if (rowCount > 0) {
      setIsEventCreated(true);

      setTimeout(()=>{
        setIsEventCreated(false);
        window.location.reload();
      },5000)
      return;
    }
    
    toast.error("An Error Occured While Creating This Event");
  };

  return (
    <LayoutContainer>
      <SideBar />
      <Header />
      <EventContainer>
        <>
          {!isEventCreated && (
            <Card
              height="800px"
              width="600px"
              children={
                <>
                  <p>Create New Event</p>
                  <Container>
                    <EventFieldsContainer>
                      <RegisterInputFieldContainer>
                        <RegisterInputFieldHeader>
                          Title Of Event
                        </RegisterInputFieldHeader>
                        <EventInputField
                          placeholder="Title Of Event"
                          name="Title"
                          onChange={onChange}
                        />
                      </RegisterInputFieldContainer>

                      <RegisterInputFieldContainer>
                        <RegisterInputFieldHeader>
                          Select Sport
                        </RegisterInputFieldHeader>
                        <EventSelectField
                          name="SportsId"
                          onChange={(e) =>
                            setState({
                              ...state,
                              SportsId: Number(e.target.value),
                            })
                          }
                        >
                          {sportsArr.length > 0 &&
                            sportsArr
                              .sort((a, b) => a.Name.localeCompare(b.Name))
                              .map((item) => {
                                return (
                                  <option
                                    key={item.SportId}
                                    value={item.SportId}
                                  >
                                    {item.Name}
                                  </option>
                                );
                              })}
                        </EventSelectField>
                      </RegisterInputFieldContainer>

                      <RegisterInputFieldContainer>
                        <RegisterInputFieldHeader>
                          Number Of Players
                        </RegisterInputFieldHeader>
                        <EventSelectField
                          name="NumberOfPlayers"
                          onChange={(e) =>
                            setState({
                              ...state,
                              NumberOfPlayers: Number(e.target.value),
                            })
                          }
                        >
                          <option value={0}>--Select--</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                          <option value={9}>9</option>
                          <option value={10}>10</option>
                        </EventSelectField>
                      </RegisterInputFieldContainer>

                      <RegisterInputFieldContainer>
                        <RegisterInputFieldHeader>
                          Who Are You Inviting
                        </RegisterInputFieldHeader>
                        <EventSelectField
                          value={isEventOpen}
                          onChange={(e) =>
                            setIsEventOpen(Number(e.target.value))
                          }
                        >
                          <option value="0">Open</option>
                          <option value="1">Selected People</option>
                        </EventSelectField>
                      </RegisterInputFieldContainer>

                      {isEventOpen > 0 && (
                        <RegisterInputFieldContainer>
                          <RegisterInputFieldHeader>
                            Select Players
                          </RegisterInputFieldHeader>
                          <EventSelectField
                            onChange={(e) => setSelectedPlayer(e.target.value)}
                          >
                            <option value="">--Select Player--</option>
                            {userArr.length > 0 &&
                              userArr
                                .sort((a, b) =>
                                  a.FirstName.localeCompare(b.FirstName)
                                ).filter(x=>x.StudentId !==StudentId)
                                .map((item) => {
                                  return (
                                    <option
                                      key={item.UserId}
                                      value={item.StudentId}
                                    >{`${item.FirstName} ${item.LastName}`}</option>
                                  );
                                })}
                          </EventSelectField>
                          <BtnAddContainer
                            style={{
                              display: selectedPlayer ? "block" : "none",
                            }}
                          >
                            <ButtonUi
                              onClick={onAdd}
                              backgroundColor={AppColors[0].value}
                              height="20px"
                              width="50px"
                              children={<label>Add</label>}
                            />
                          </BtnAddContainer>
                          <DisplayList>
                            {state.InviteesId.map((item, index) => {
                              return (
                                <SelectedPlayerList
                                  key={item + index}
                                  onRemove={onPlayerRemove}
                                  studentId={item}
                                  name={getUserByStaffId(item)}
                                />
                              );
                            })}
                          </DisplayList>
                        </RegisterInputFieldContainer>
                      )}
                      <RegisterInputFieldContainer>
                        <RegisterInputFieldHeader>
                          Event Location
                        </RegisterInputFieldHeader>
                        <EventInputField
                          placeholder="Location"
                          name="Location"
                          onChange={onChange}
                        />
                      </RegisterInputFieldContainer>
                    </EventFieldsContainer>

                    <EventFieldsContainer>
                      <RegisterInputFieldContainer>
                        <RegisterInputFieldHeader>
                          Start Date
                        </RegisterInputFieldHeader>
                        <EventDate
                          name="StartDate"
                          onChange={onChange}
                        />
                      </RegisterInputFieldContainer>

                      <RegisterInputFieldContainer>
                        <RegisterInputFieldHeader>
                          Start Time
                        </RegisterInputFieldHeader>
                        <EventTime name="StartTime" onChange={onChange} />
                      </RegisterInputFieldContainer>

                      <RegisterInputFieldContainer>
                        <RegisterInputFieldHeader>
                          End Date
                        </RegisterInputFieldHeader>
                        <EventDate
                          name="EndDate"
                          onChange={onChange}
                        />
                      </RegisterInputFieldContainer>

                      <RegisterInputFieldContainer>
                        <RegisterInputFieldHeader>
                          End Time
                        </RegisterInputFieldHeader>
                        <EventTime
                          name="EndTime"
                          onChange={onChange}
                        />
                      </RegisterInputFieldContainer>

                      <RegisterInputFieldContainer>
                        <RegisterInputFieldHeader>
                          Description
                        </RegisterInputFieldHeader>
                        <EventDescriptionField
                          name="Description"
                          maxLength={100}
                          onChange={(e) =>
                            setState({ ...state, Description: e.target.value })
                          }
                        ></EventDescriptionField>
                      </RegisterInputFieldContainer>
                    </EventFieldsContainer>
                  </Container>
                  <br />
                  <br />
                  <ButtonUi
                    height="50px"
                    width="100px"
                    onClick={onCreate}
                    backgroundColor={AppColors[0].value}
                    children={<label>Create Event</label>}
                  />
                  &nbsp; &nbsp; &nbsp;
                  <ButtonUi
                    height="50px"
                    width="100px"
                    backgroundColor={AppColors[1].value}
                    children={<label>Create Fields</label>}
                  />
                </>
              }
            />
          )}
          {isEventCreated && (
            <Card
              height="200px"
              width="500px"
              children={<p><b>`{state.Title}`</b> <b></b><br/> <br/> has been created successfully</p>}
            />
          )}
        </>
      </EventContainer>
      <ToastContainer />
    </LayoutContainer>
  );
};

export default CreateEvent;
