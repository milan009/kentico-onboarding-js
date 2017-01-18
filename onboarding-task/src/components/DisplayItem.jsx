import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'

function DisplayItem(props) {
  let { item: { description }, index } = props;
  return (
    <li
      className="list-group-item"
      onClick={() => props.onItemClick()}>
        {index}. {description}
    </li>
  );
}

DisplayItem.propTypes = {
  item: ImmutablePropTypes.recordOf({
    description: PropTypes.string.isRequired
  }),
  index: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default DisplayItem;
