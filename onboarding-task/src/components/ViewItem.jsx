import React from 'react';
import PropTypes from 'prop-types';

const viewItemStyle = {
  cursor: 'pointer',
};

const ViewItem = (props) => (
  <div onClick={props.onClick} style={viewItemStyle} title="Click to edit this item">
    <span>{props.index}. </span>
    {props.item.text}
  </div>);

ViewItem.displayName = 'ViewItem';

ViewItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export { ViewItem };
