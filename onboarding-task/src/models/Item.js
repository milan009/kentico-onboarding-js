import { Record } from 'immutable';

const Item = new Record({
  textSaved: '',
  textShown: '',
  isEditing: false,
});

export { Item };
