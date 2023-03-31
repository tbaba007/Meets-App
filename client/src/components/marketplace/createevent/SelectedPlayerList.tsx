import React from 'react';
import { AppColors } from '../../../helper/common';
import ButtonUi from '../../ui/button/button';


const SelectedPlayerList:React.FC<{name:string,studentId:string,onRemove:(studentId:string)=>void}>=({name,onRemove,studentId})=>{

    return <section><ButtonUi onClick={()=>onRemove(studentId)} width='50px' height='30px' backgroundColor={AppColors[1].value} children={<label>X</label>}/>&nbsp;<p>{name}</p></section>
             
}
export default SelectedPlayerList;