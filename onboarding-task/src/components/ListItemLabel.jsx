import React from 'react';

const ListItemLabel = (props) =>
  <div onClick={props.onClickHandler}>{props.index}. {props.text}</div>;

ListItemLabel.propTypes = {
  text: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  onClickHandler: React.PropTypes.func.isRequired,
};

export { ListItemLabel };
