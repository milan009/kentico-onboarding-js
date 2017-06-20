import React from 'react';
import PropTypes from 'prop-types';


const ViewItem = (props) => (
  <div onClick={() => props.onClick(props.element.id, { isEdited: true })}>
    <span>{props.index}. </span>
    {props.element.text}
  </div>);

ViewItem.propTypes = {
  index: PropTypes.number,
  element: PropTypes.shape({
    text: PropTypes.string,
    id: PropTypes.string,
    isEdited: PropTypes.bool,
  }),
  onClick: PropTypes.func,
};

ViewItem.displayName = 'ViewItem';

export { ViewItem };
