import { Record } from 'immutable';

const defaultViewItem = {
  id: '00000000-0000-0000-0000-000000000000',
  index: 0,
  text: '',
  isEdited: false,
};

export const ViewItem = Record(defaultViewItem, 'ViewItem');
