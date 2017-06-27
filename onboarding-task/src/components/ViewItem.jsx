import React from 'react';
import PropTypes from 'prop-types';

const ViewItem = (props) => (
  <div onClick={props.onClick}>
    <span>{props.index}. </span>
    {props.item.text}
  </div>);

ViewItem.displayName = 'ViewItem';

ViewItem.propTypes = {
  index: PropTypes.number,
  item: PropTypes.shape({
    text: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export { ViewItem };
