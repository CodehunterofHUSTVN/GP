import React from 'react';
import {CardDeck} from 'reactstrap';

import Cake from './Cake';

import './content.css'

const Content = ({data,AddItem}) => {
    return (
      <CardDeck className="cds">
        {
          data.map((item) => {
            return (
              <Cake  
                item={item}
                AddItem={AddItem}
              />
            )})
        }
      </CardDeck>
  );
}
        
export default Content;