import Immutable from 'immutable';

const ItemRecord = Immutable.Record({
  id: undefined,
  text: undefined,
  fromDisplayed: false,
});

export { ItemRecord };
