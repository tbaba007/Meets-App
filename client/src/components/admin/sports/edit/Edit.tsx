import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify';
import { Update } from '../../../../api/services/sports';
import { AppColors, capitalizeFirstLetter } from '../../../../helper/common';
import Header from '../../../Header';
import { LayoutContainer } from '../../../layout';
import SideBar from '../../../sidebar/sidebar';
import ButtonUi from '../../../ui/button';
import Card from '../../../ui/card';
import { RegisterInputField, RegisterInputFieldHeader } from '../../../user/register/styles';
import { EditUserContainer, EditUserFooterContainer } from '../../user/edituser/styles';
import { EditSportsContainer } from './styles';

const EditSports=()=>{
    const navigate=useNavigate();
    const {id}=useParams();
    const {state}=useLocation();
    const onSave= async ()=>{
        if(!name.trim()){
          return  toast.error('Please enter a valid Sports Name')
        }

        if(state?.Name!==name){
          const updateName=capitalizeFirstLetter(name)!!;
          const isUpdate=await Update(Number(id),updateName);
          if(isUpdate && isUpdate==="OK"){
            return toast.success("Sport Updated Successfully");
          }
          toast.error("An Error Occured While Updating The Sport")
        }
        // call Api
      
    }
    const onCancel=()=>{
        navigate('/sports')
    }
    const [name,setName]=useState(state?.Name)
    return(
        <LayoutContainer>
         <SideBar/> 
         <Header/>
         <EditSportsContainer>
         <Card
          width="400px"
          height="300px"
          children={
            <>
              <p>Edit Sport</p>
              <EditUserContainer>
                <RegisterInputFieldHeader>Sports Name</RegisterInputFieldHeader>
                <RegisterInputField
                  placeholder="Name"
                  value={name}
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

export default EditSports;