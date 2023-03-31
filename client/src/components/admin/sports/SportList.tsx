import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Deactivate, GetAllSports } from "../../../api/services/sports";
import { AppColors } from "../../../helper/common";
import Header from "../../Header";
import { LayoutContainer } from "../../layout";
import SideBar from "../../sidebar";
import ButtonUi from "../../ui/button";
import { BtnAddSports, SportListContainer, SportListTable } from "./styles";
import { ISportsProps } from "./types";

const SportsList = () => {
  document.title = "Sport List";
  const [sportsArr,setSportsArr]=useState<ISportsProps[]>([]);
  const [update,setUpdate]=useState(0)
  useEffect(()=>{
          const GetAllData =async()=>{
             const data=await GetAllSports();
             const response:ISportsProps[]=data;
             setSportsArr(response)

          };

          GetAllData();

  },[update])



  const navigate=useNavigate();
  const onEdit=({Name,SportId}:ISportsProps)=>{
    navigate(`/editSport/${SportId}`,{state:{
         Name
    }})
  }

  const onDelete= async ({SportId,Name}:ISportsProps)=>{
    if(window.confirm("Are you sure you want to delete?")){
      const deleteSport=await Deactivate(SportId);
      if(deleteSport && deleteSport==="OK"){
        toast.success(`${Name} Deleted Successfully`);
        setUpdate(update+1)
      }
      else
      toast.error(`Cannot Delete ${Name} At The Moment`);
    }
    
  }

  const onAdd=()=>{
    navigate('/createsport');
  }
  
  return (
    <LayoutContainer>
      <SideBar /> 
      <Header/>
      <BtnAddSports>
        <ButtonUi
        width="100px"
        height="40px"
        onClick={onAdd}
        backgroundColor={AppColors[0].value}
        children={<p>Add new</p>}
        />
      </BtnAddSports>
      <SportListContainer>

      <SportListTable cellSpacing={0} cellPadding={0} count={sportsArr.length}>
        <thead>
          <tr>
            <th>SN</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {sportsArr.length>0 && sportsArr.map((item, index) => {
            return (
              <tr key={item.SportId}>
                <td>{index + 1}</td>
                <td>{item.Name}</td>

                <td>
                  <ButtonUi
                    width="100px"
                    height="30px"
                    onClick={()=>onEdit(item)}
                    backgroundColor={AppColors[0].value}
                    children={<label>Edit</label>}
                  />
                  &nbsp;&nbsp;
                  <ButtonUi
                    width="100px"
                    height="30px"
                    onClick={()=>onDelete(item)}
                    backgroundColor={AppColors[1].value}
                    children={<label>Delete</label>}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </SportListTable>

      </SportListContainer>


      <ToastContainer/>
    </LayoutContainer>
  );
};

export default SportsList;
