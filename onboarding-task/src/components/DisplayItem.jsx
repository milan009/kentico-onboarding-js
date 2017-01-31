import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const DisplayItem = ({
    item: { description },
    index,
    onItemClick,
  }) => (
  <div onClick={() => onItemClick()}>
    {index}. {description}
  </div>
);

DisplayItem.propTypes = {
  item: ImmutablePropTypes.recordOf({
    description: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default DisplayItem;
