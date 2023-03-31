import React from 'react';
import { Container } from './styles';
import { ICardProps } from './types';


const Card=({width,height,children}:ICardProps)=>{
    return <Container height={height} width={width}>
            {children}
           </Container>
}
export default Card;