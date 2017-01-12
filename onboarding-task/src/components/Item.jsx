import React from 'react';

function Item(props){
  let { description, index } = props;
  return <li className="list-group-item">{index}. { description }</li>
}

export default Item;
