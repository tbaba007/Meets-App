import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UpdateUser } from "../../../../api/services/user";
import { AppColors } from "../../../../helper/common";
import { LayoutContainer } from "../../../layout";
import SideBar from "../../../sidebar";
import ButtonUi from "../../../ui/button/button";
import Card from "../../../ui/card";
import {
  RegisterInputFieldHeader,
  RegisterInputField,
} from "../../../user/register/styles";
import { IUserProps } from "../../../user/register/types";
import {
  EditUserComponent,
  EditUserContainer,
  EditUserFooterContainer,
} from "./styles";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [firstName, setFirstName] = useState<string | undefined>(
    state?.FirstName
  );
  const [lastName, setLastName] = useState<string | undefined>(state?.LastName);
  const [mobile, setMobile] = useState<string | undefined>(state?.Mobile);

  const onCancel = () => {
    navigate("/users");
  };

  const onSave = async () => {
    if (!firstName?.trim()) return toast.error("Please enter a first name");
    if (!lastName?.trim()) return toast.error("Please enter a last name");
    //call API
    const data:IUserProps={
      FirstName: firstName,
      LastName: lastName,
      Mobile: mobile,
      UserId: Number(id),
      Email: "",
      Password: "",
      StudentId: ""
    }
    if(window.confirm("Are you sure you want to update?")){
      const updateData = await UpdateUser(data);
      if(updateData){
        toast.success('User Updated Successfully');
        setTimeout(()=>{
            navigate('/users');
        },5000);
      }
      else{
        toast.error('An error occured while updating the user')
      }
    }

   
  };
  return (
    <LayoutContainer>
      <SideBar />
      <EditUserComponent>
        <Card
          width="400px"
          height="500px"
          children={
            <>
              <p>Edit User</p>
              <EditUserContainer>
                <RegisterInputFieldHeader>FirstName</RegisterInputFieldHeader>
                <RegisterInputField
                  placeholder="FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </EditUserContainer>
              <EditUserContainer>
                <RegisterInputFieldHeader>LastName</RegisterInputFieldHeader>
                <RegisterInputField
                  placeholder="LastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </EditUserContainer>
              <EditUserContainer>
                <RegisterInputFieldHeader>Mobile</RegisterInputFieldHeader>
                <RegisterInputField
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
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
      </EditUserComponent>
      <ToastContainer/>
    </LayoutContainer>
  );
};

export default EditUser;
