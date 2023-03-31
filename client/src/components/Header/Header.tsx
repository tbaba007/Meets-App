import { useNavigate } from 'react-router-dom'
import { getMessage, removeMessageByKey } from '../../helper/common'
import { HeaderContainer, HeaderProfileDropDown, HeaderText } from './styles'

const Header=()=>{
    const navigate=useNavigate();
    const user=getMessage('user')

    
    const onSignOut=()=>{
        removeMessageByKey('user');
        navigate('/login');
    }
    return <>
        <HeaderContainer>
           Welcome &nbsp;<HeaderText >{user && JSON.parse(user).FirstName}
           
           <HeaderProfileDropDown onClick={onSignOut}>
            SignOut
            </HeaderProfileDropDown>
           </HeaderText>
          
        </HeaderContainer>
       
        
        </>
}

export default Header