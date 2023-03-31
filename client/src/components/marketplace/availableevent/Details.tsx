import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { JoinEvent } from '../../../api/services/events';
import { AppColors, getMessage } from '../../../helper/common';
import Header from '../../Header';
import { LayoutContainer } from '../../layout';
import Sidebar from '../../sidebar';
import ButtonUi from '../../ui/button/button';
import Card from '../../ui/card';
import { DetailsContainer } from './styles';
import { IAvailableEventProps } from './types';



const EventDetails=()=>{
    let StudentId='';
    const {state}=useLocation();
    const navigate=useNavigate();
    const user=getMessage('user');
    if(user){
        StudentId=JSON.parse(user).StudentId;
    }
    const {FirstName,
        LastName,
        Location,
        Description,
        Title,
        sport,
        Acceptedids,
        MarketPlaceId,
        

    }=state as IAvailableEventProps;
    const onCancel=()=>{
        navigate('/availableevents')
    }
    const onJoin=async()=>{
        if(window.confirm('Are you sure you want to join this event?'))
        {
            debugger;
            if(Acceptedids){
                const acceptedUsers=Acceptedids.split(',');
                //check if user already joined this event
                if(Acceptedids){
                    const isAlreadyJoined=acceptedUsers.find(x=>x===StudentId);
                    if(isAlreadyJoined)
                    return toast.error("You have already joined this event ");
                }

                  const updateData=await JoinEvent(MarketPlaceId,[...acceptedUsers,StudentId].join(','))
                        if(updateData){
                            toast.success('Event joined successfully!');
                            setTimeout(()=>{
                                navigate('/availableevents')
                            },3000)
                        }
                }
            else{
             
                  const updateData=await JoinEvent(MarketPlaceId,StudentId)
                  if(updateData){
                    toast.success('Event joined successfully!');
                    setTimeout(()=>{
                        navigate('/availableevents')
                    },3000)
                }

            }
          

            
        }
    }
    
    
return <LayoutContainer>
        <Sidebar/>
        <Header/>
        <DetailsContainer>
            <Card
            height='300px'
            width='400px'
            children={<>
            <p>Name:{FirstName} &nbsp; {LastName}</p>
            <p>Title: &nbsp;{Title} </p>
            <p>Sport: &nbsp;{sport} </p>
            <p>Location: &nbsp;{Location}</p>
            <p>Description: &nbsp;{Description}</p>
            
            <span><ButtonUi
                    backgroundColor={AppColors[0].value}
                    height="30px"
                    onClick={onJoin}
                    children={<label>Join</label>}
                    /> 
                    &nbsp;
                    <ButtonUi
                    backgroundColor={AppColors[1].value}
                    height="30px"
                    onClick={onCancel}
                    children={<label>Cancel</label>}
                    /> 
                    </span>
            
            </>}
            />
        </DetailsContainer>
       <ToastContainer/>
      </LayoutContainer>
}

export default EventDetails;