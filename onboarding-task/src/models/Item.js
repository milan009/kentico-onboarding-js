import { Record } from 'immutable';

const Item = new Record({
  id: '',
  textSaved: '',
  textShown: '',
  isEditing: false,
});

export { Item };
