import React, { PropTypes } from 'react';

function Item(props){
  let { description, index } = props;
  return (
    <li className="list-group-item">
      {index}.
      {description}
    </li>
  );
}

Item.propTypes = {
  description: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default Item;
