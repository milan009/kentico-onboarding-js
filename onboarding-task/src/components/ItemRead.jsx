import React, { PropTypes } from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';

const ItemRead = (props) => (
  <div onDoubleClick={props.onDoubleClick} >
    <span>{props.item.index}. </span>
    {props.item.text}
  </div>
  );

ItemRead.displayName = 'ItemRead';
ItemRead.propTypes = {
  // item: ImmutablePropTypes.recordOf({
  //   id: PropTypes.string.isRequired,
  //   text: PropTypes.string.isRequired,
  //   isEdited: PropTypes.bool.isRequired,
  //   index: PropTypes.number.isRequired,
  // }).isRequired,
  item: PropTypes.object.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export { ItemRead };
