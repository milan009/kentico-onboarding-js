import * as Immutable from 'immutable';
import Item from '../models/Item';

const getStaticItems = () => [
  new Item('Make a coffee'),
  new Item('Make a coffee great again'),
  new Item('We want you, coffee!'),
  new Item('Coffee can do it \uD83D\uDCAA'),
];

const getStaticItemsDictionary = () => getStaticItems()
  .map(item => [item.id, item]);

const seedStore = () => {
  return {
    items: new Immutable.OrderedMap(getStaticItemsDictionary()),
    editedItems: undefined,
  };
};

export { seedStore };
