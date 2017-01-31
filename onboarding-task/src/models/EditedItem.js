import { Record } from 'immutable';

const defaultEditedItem = {
  description: '',
  isOriginal: true,
};

class EditedItem extends Record(defaultEditedItem) {
}

export default EditedItem;
