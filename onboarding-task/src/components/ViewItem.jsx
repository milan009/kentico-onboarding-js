import React from 'react';
import PropTypes from 'prop-types';

const ViewItem = (props) => (
  <div className="btn btn-block " onClick={props.onClick} title="Click to edit this item">
    <div className="text-left">
      <span>{props.index}. </span>
      {props.item.text}
    </div>
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
