import * as Immutable from 'immutable';

const defaultItem: IItem = {
  guid: '0000000000',
  text: 'default Item',
};

interface IItem {
  readonly guid: string;
  readonly text: string;
}

class ItemRecord extends Immutable.Record(defaultItem) implements IItem {
  readonly guid: string;
  readonly text: string;
}

const ViewItemRecord = Immutable.Record({
  guid: '0000000000',
  text: 'default Item',
  isEdited: false,
});

interface IItemRecord {
  guid: string;
  text: string;
}

export { ItemRecord, ViewItemRecord, IItemRecord };
