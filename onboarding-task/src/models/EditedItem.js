import { Record } from 'immutable';

const defaultNewItem = {
  description: '',
  isEdited: false,
};

class EditedItem extends Record(defaultNewItem) {
  constructor(description) {
    super({
      isEdited: true,
      description,
    });
  }
}

export default EditedItem;
