import React from 'react';
import PropTypes from 'prop-types';

import * as ActionCreators from '../actions/actionCreators';
import { connect } from 'react-redux';

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

const mapDispatchToProps = (dispatch) => ({
  onClick: (id) =>
    dispatch(ActionCreators.makeEditable(id)),
});

export default connect(null, mapDispatchToProps)(ViewItem);
