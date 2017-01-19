import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

function DisplayItem(props) {
  let { item: { description }, index } = props;
  return (
    <div onClick={() => props.onItemClick()}>
      {index}. {description}
    </div>
  );
}

DisplayItem.propTypes = {
  item: ImmutablePropTypes.recordOf({
    description: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default DisplayItem;
