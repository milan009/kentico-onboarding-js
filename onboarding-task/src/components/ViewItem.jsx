import React from 'react';
import PropTypes from 'prop-types';

const ViewItem = (props) => (
  <div onClick={props.onClick}>
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
