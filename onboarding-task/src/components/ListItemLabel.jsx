import React from 'react';

const ListItemLabel = ({ text, index, onClick }) =>
  <div onClick={onClick}>{index}. {text}</div>;

ListItemLabel.propTypes = {
  text: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export { ListItemLabel };
