import React from 'react';
import PropTypes from 'prop-types';

const ViewItem = (props) => (
  <div onClick={props.onClick}>
    <span>{props.index}. </span>
    {props.element.text}
  </div>);

ViewItem.displayName = 'ViewItem';

ViewItem.propTypes = {
  index: PropTypes.number,
  element: PropTypes.shape({
    text: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export { ViewItem };
