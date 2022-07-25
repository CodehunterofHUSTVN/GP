import React from 'react';
import {
  Card, 
  CardText, 
  CardBody,
  CardTitle, 
  CardSubtitle, 
  Button,
  Navbar,
} from 'reactstrap';

import Cart from '../../../assets/library/Cart button'
import './content.css'

const Cake = ({item,AddItem}) => {

  return (
    <Card>
      <CardBody className="cbs">
        <img src={item.img} alt={item.name}/>
        <Navbar className="nbs2">
          <CardTitle tag="h5" className="cts1">{item.name}</CardTitle>
          <CardTitle tag="h5" className="cts1 cts2">${item.price}</CardTitle>
        </Navbar>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{item.collection}</CardSubtitle>
        <CardText className="ps">{item.foreword}</CardText>
        <Navbar>
          <Button className="bts2" href={item.path}><span> Read more </span></Button>
          <Button className="bts3" item={item} onClick={()=>AddItem(item)}>
            <Cart/>
          </Button>  
        </Navbar>
      </CardBody>
    </Card>
)}
export default Cake;