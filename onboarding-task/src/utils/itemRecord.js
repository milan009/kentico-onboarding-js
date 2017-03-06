import Immutable from 'immutable';

const ItemRecord = Immutable.Record({
  guid: '0000000000',
  text: 'default Item',
});

const ViewItemRecord = Immutable.Record({
  guid: '0000000000',
  text: 'default Item',
  isEdited: false,
});

export { ItemRecord, ViewItemRecord };
