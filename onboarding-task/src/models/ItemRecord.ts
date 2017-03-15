import * as Immutable from 'immutable';

const defaultItem: IItemRecord = {
  guid: '0000000000',
  text: 'default Item',
};

interface IItemRecord {
  readonly guid: string;
  readonly text: string;
}

class ItemRecord extends Immutable.Record(defaultItem) implements IItemRecord {
  readonly guid: string;
  readonly text: string;
}

export { ItemRecord, IItemRecord };
