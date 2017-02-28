import React from 'react';

const ListItemLabel = ({ text, index, onClickHandler }) =>
  <div onClick={onClickHandler}>{index}. {text}</div>;

ListItemLabel.propTypes = {
  text: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  onClickHandler: React.PropTypes.func.isRequired,
};

export { ListItemLabel };
