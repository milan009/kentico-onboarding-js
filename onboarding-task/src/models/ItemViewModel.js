import { PropTypes } from 'react';
import { Record } from 'immutable';

export const ItemViewModel = new Record({
  id: '',
  text: '',
  index: -1,
  isEditing: false,
});


ItemViewModel.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isEditing: PropTypes.bool.isRequired,
};
