import React, { Component } from 'react';

const LineTextPropTypes = {
  isEdited: React.PropTypes.bool.isRequired,
  text: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onDoubleClick: React.PropTypes.func,
};

function LineText(props) {
  const isEdited = props.isEdited;
  if (isEdited && !props.onDoubleClick) {
    return (
      <input className="" value={props.text} onChange={props.onChange} />
    );
  }
  return <span onDoubleClick={props.onDoubleClick}> {props.text} </span>;
}
LineText.propTypes = LineTextPropTypes;

export default LineText;
