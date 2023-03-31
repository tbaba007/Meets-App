import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AddSport } from '../../../../api/services/sports';
import { AppColors, capitalizeFirstLetter } from '../../../../helper/common';
import Header from '../../../Header';
import { LayoutContainer } from '../../../layout';
import SideBar from '../../../sidebar';
import ButtonUi from '../../../ui/button';
import Card from '../../../ui/card';
import { RegisterInputFieldHeader, RegisterInputField } from '../../../user/register/styles';
import { EditUserContainer, EditUserFooterContainer } from '../../user/edituser/styles';
import { EditSportsContainer } from '../edit/styles';

const CreateSport=()=>{
    const navigate=useNavigate();
    const [name,setName]=useState('')
    const onSave=async()=>{
        if(!name.trim()) return toast.error('Please enter a valid sports name')
        //call api

        const sportName=capitalizeFirstLetter(name)!!
        debugger;
        const isSave=await AddSport(sportName);
        const {constraint}=isSave;
        if(constraint){
          return toast.error(`${name} already exists`);
        }
        toast.success("Sport Added Successfully");
        setName('')
    }
    const onCancel=()=>{
        navigate('/sports');
    }
    return (
        <LayoutContainer>
        <SideBar/> 
        <Header/>
        <EditSportsContainer>
        <Card
         width="400px"
         height="350px"
         children={
           <>
             <p>Create New Sport</p>
             <EditUserContainer>
               <RegisterInputFieldHeader>Sports Name</RegisterInputFieldHeader>
               <RegisterInputField
                 placeholder="Name"
                 value={name}
                 maxLength={15}
                 onChange={(e) => setName(e.target.value)}
               />
             </EditUserContainer>
            
             <EditUserFooterContainer>
             <ButtonUi
               width="100px"
               height="50px"
               onClick={onSave}
               backgroundColor={AppColors[0].value}
               children={<label>Save</label>}
             />
              <ButtonUi
               width="100px"
               height="50px"
               onClick={onCancel}
               backgroundColor={AppColors[1].value}
               children={<label>Cancel</label>}
             />
               </EditUserFooterContainer>
             
           </>
         }
       />
       </EditSportsContainer>   
       <ToastContainer/>   
       </LayoutContainer>
    )
}

export default CreateSport;