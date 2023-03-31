import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { AppColors, isEmailValid } from "../../../helper/common";
import ButtonUi from "../../ui/button/button";
import Card from "../../ui/card";
import { Container } from "../login/styles";
import {
  EmailExistsErr,
  RegisteredLabel,
  RegisterInputContainer,
  RegisterInputField,
  RegisterInputFieldContainer,
  RegisterInputFieldHeader,
  RegisterInputFieldPassword,
} from "./styles";
import { toast, ToastContainer } from "react-toastify";
import { IUserProps } from "./types";
import { IsEmailExists, RegisterUser } from "../../../api/services/user";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate=useNavigate();
  const [state,setState]=useState<IUserProps>({
    Email:'',
    Password:'',
    FirstName:'',
    LastName:'',
    StudentId:'',
    Mobile:''
  })
  const [isEmailError,setIsEmailError]=useState(false)

  document.title = "Register";

  const onRegister=async()=>{
    if(isEmailError){
      return toast.warn("Please correct the errors before submitting");

    }
    const {Email,FirstName,LastName,Password,StudentId,Mobile}=state;
    if(!FirstName?.trim())return toast("Please Enter FirstName");
    if(!LastName?.trim())return toast("Please Enter LastName");
    if(!Password.trim())return toast("Please Enter Password");
    if(!StudentId.trim())return toast("Please Enter StudentId");
    if(!Email.trim())return toast("Please Enter Email");


    //call api
    const data:IUserProps={
      FirstName:FirstName,
      LastName:LastName,
      Email:Email,
      Password:Password,
      StudentId:StudentId,
      Mobile:Mobile
    }
    const registerUser=await RegisterUser(data);
    debugger;
      if(registerUser){
        toast.success("Registration successful");

        setTimeout(()=>{
            navigate('/login')
        },5000)
        return;
      }
    toast.error("An Error Occured During Registration");
  }

  const checkEmail=async()=>{
    const {Email}=state;
    if(Email && isEmailValid(Email.trim())){
      const isEmailExists=await IsEmailExists(Email.trim());
      if(isEmailExists && isEmailExists.length>0){
        setIsEmailError(true);
      }
    }
  }

  const onChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setState({
      ...state,[event.target.name]:event.target.value
    })
  }


  return (
    <Container>
      <Card
        width="580px"
        height="550px"
        children={
          <>
            <p>Join Now</p>
            <br/>
            {isEmailError && <EmailExistsErr>Email Already Exists</EmailExistsErr>}

            <RegisterInputContainer>
              <RegisterInputFieldContainer>
                <RegisterInputFieldHeader>FirstName</RegisterInputFieldHeader>
                <RegisterInputField placeholder="First Name" name="FirstName"onChange={onChange}/>
              </RegisterInputFieldContainer>

              <RegisterInputFieldContainer>
                <RegisterInputFieldHeader>LastName</RegisterInputFieldHeader>
                <RegisterInputField placeholder="Last Name" name="LastName" onChange={onChange} />
              </RegisterInputFieldContainer>
            </RegisterInputContainer>

            <RegisterInputContainer>
              <RegisterInputFieldContainer>
                <RegisterInputFieldHeader>
                  Mobile Number
                </RegisterInputFieldHeader>
                <RegisterInputField placeholder="Mobile Number" name="Mobile" onChange={onChange} maxLength={11} />
              </RegisterInputFieldContainer>

              <RegisterInputFieldContainer>
                <RegisterInputFieldHeader>Email</RegisterInputFieldHeader>
                <RegisterInputField placeholder="Email" name="Email" onChange={onChange} onBlur={checkEmail} maxLength={20}/>
              </RegisterInputFieldContainer>
            </RegisterInputContainer>

            <RegisterInputContainer>
              <RegisterInputFieldContainer>
                <RegisterInputFieldHeader>Student Id</RegisterInputFieldHeader>
                <RegisterInputField placeholder="Student Id" name="StudentId" onChange={onChange} />
              </RegisterInputFieldContainer>
              <RegisterInputFieldContainer>
                <RegisterInputFieldHeader>Password</RegisterInputFieldHeader>
                <RegisterInputFieldPassword placeholder="Password" name="Password" onChange={onChange} />
              </RegisterInputFieldContainer>
            </RegisterInputContainer>
            <br/>
            <ButtonUi onClick={onRegister} backgroundColor={AppColors[0].value} width="150px" height="40px" children={<label>Register</label>} />
              <br/>
              <br/>
             <RegisteredLabel to="/login">Click Here to login</RegisteredLabel> 
            
          </>
        }
      />
      <ToastContainer/>
    </Container>
  );
};

export default Register;
