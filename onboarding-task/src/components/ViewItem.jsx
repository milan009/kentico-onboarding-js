import React from 'react';
import PropTypes from 'prop-types';

const ViewItem = (props) => (
  <div className="btn btn-block " onClick={() => props.onClick(props.item.id)} title="Click to edit this item">
    <div className="text-left">
      <span>{props.index}. </span>
      {props.item.text}
    </div>
  </div>);

ViewItem.displayName = 'ViewItem';

ViewItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export { ViewItem as ViewItemComponent };
