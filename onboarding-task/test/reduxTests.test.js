import { OrderedMap } from 'immutable';

import * as actionCreators from '../src/actions/actionCreators';
import * as actionTypes from '../src/actions/actionTypes';
import { listReducer } from '../src/reducers/list/listReducer';
import { itemFlagsReducer } from '../src/reducers/list/itemFlagsReducer';
import { itemFlagsMapReducer } from '../src/reducers/list/itemFlagsMapReducer';
import { itemReducer } from '../src/reducers/list/itemReducer';
import { itemsReducer } from '../src/reducers/list/itemsReducer';
import { ItemData } from '../src/models/ItemData';
import { ItemFlags } from '../src/models/ItemFlags';

describe('Action creators', () => {
  it('creates "ITEM_CREATED" action correctly', () => {
    const addItemAction = actionCreators.createItem('New Item');
    expect(addItemAction.type).toBe(actionTypes.ITEM_CREATED);
    expect(addItemAction.payload).toBeDefined();
    expect(addItemAction.payload.newId).toBeDefined();
    expect(addItemAction.payload.text).toBe('New Item');
  });

  it('creates "ITEM_DELETED" action correctly', () => {
    const deleteItemAction = actionCreators.deleteItem(17);
    expect(deleteItemAction.type).toBe(actionTypes.ITEM_DELETED);
    expect(deleteItemAction.payload).toBeDefined();
    expect(deleteItemAction.payload.id).toBe(17);
    expect(deleteItemAction.payload.text).toBeUndefined();
  });

  it('creates "ITEM_CHANGE_CANCELLED" action correctly', () => {
    const itemCancelChangeAction = actionCreators.cancelChange(21);
    expect(itemCancelChangeAction.type).toBe(actionTypes.ITEM_CHANGE_CANCELLED);
    expect(itemCancelChangeAction.payload).toBeDefined();
    expect(itemCancelChangeAction.payload.id).toBe(21);
    expect(itemCancelChangeAction.payload.text).toBeUndefined();
  });

  it('creates "ITEM_CHANGE_SAVED" action correctly', () => {
    const itemSaveChangeAction = actionCreators.saveChange(42, 'Edited Text');
    expect(itemSaveChangeAction.type).toBe(actionTypes.ITEM_CHANGE_SAVED);
    expect(itemSaveChangeAction.payload).toBeDefined();
    expect(itemSaveChangeAction.payload.id).toBe(42);
    expect(itemSaveChangeAction.payload.text).toBe('Edited Text');
  });

  it('creates "ITEM_MAKE_EDITABLE" action correctly', () => {
    const makeEditableItemAction = actionCreators.makeEditable(25);
    expect(makeEditableItemAction.type).toBe(actionTypes.ITEM_MAKE_EDITABLE);
    expect(makeEditableItemAction.payload).toBeDefined();
    expect(makeEditableItemAction.payload.id).toBe(25);
    expect(makeEditableItemAction.payload.text).toBeUndefined();
  });
});

describe('Single object reducers', () => {
  describe('ItemFlags reducer', () => {
    describe('"ITEM_MAKE_EDITABLE" action', () => {
      it('makes ItemFlags edited correctly', () => {
        const prevState = new ItemFlags(
          {
            isBeingEdited: false,
          }
        );

        const action = actionCreators.makeEditable('42');
        const nextState = itemFlagsReducer(prevState, action);

        expect(nextState.isBeingEdited).toBe(true);
        expect(prevState.isBeingEdited).toBe(false);
      });

      it('does not change already edited ItemFlags', () => {
        const prevState = new ItemFlags(
          {
            isBeingEdited: true,
          }
        );

        const action = actionCreators.makeEditable('42');
        const nextState = itemFlagsReducer(prevState, action);

        expect(nextState).toEqual(prevState);
      });
    });

    describe('"ITEM_CHANGE_CANCELLED" action', () => {
      it('does not change ItemFlags that is not being edited', () => {
        const prevState = new ItemFlags(
          {
            isBeingEdited: false,
          }
        );

        const action = actionCreators.cancelChange('42');
        const nextState = itemFlagsReducer(prevState, action);

        expect(nextState).toEqual(prevState);
      });

      it('makes edited ItemFlags not editable anymore', () => {
        const prevState = new ItemFlags(
          {
            isBeingEdited: true,
          }
        );

        const action = actionCreators.cancelChange('42');
        const nextState = itemFlagsReducer(prevState, action);

        expect(nextState.id).toBe(prevState.id);
        expect(nextState.text).toBe(prevState.text);
        expect(nextState.isBeingEdited).toBe(false);
        expect(prevState.isBeingEdited).toBe(true);
      });
    });

    describe('"ITEM_CHANGE_SAVED" action', () => {
      it('does not change ItemFlags that is not being edited', () => {
        const prevState = new ItemFlags(
          {
            isBeingEdited: false,
          }
        );

        const action = actionCreators.cancelChange('42');
        const nextState = itemFlagsReducer(prevState, action);

        expect(nextState).toEqual(prevState);
      });

      it('makes edited ItemFlags not editable anymore', () => {
        const prevState = new ItemFlags(
          {
            isBeingEdited: true,
          }
        );

        const action = actionCreators.cancelChange('42');
        const nextState = itemFlagsReducer(prevState, action);

        expect(nextState.id).toBe(prevState.id);
        expect(nextState.text).toBe(prevState.text);
        expect(nextState.isBeingEdited).toBe(false);
        expect(prevState.isBeingEdited).toBe(true);
      });
    });
  });

  describe('Item reducer', () => {
    describe('"ITEM_CHANGE_SAVED" action', () => {
      it('saves changed text correctly in ItemData', () => {
        const prevState = new ItemData(
          {
            text: 'Mlok',
          }
        );

        const action = actionCreators.saveChange(42, 'Glock');
        const nextState = itemReducer(prevState, action);

        expect(nextState.text).toBe('Glock');
        expect(prevState.text).toBe('Mlok');
      });
    });
  });
});

describe('Map reducers', () => {
  describe('Items map reducer', () => {
    describe('"ITEM_CREATED" action', () => {
      it('adds item without passed state', () => {
        const action = actionCreators.createItem('Mlok');
        const nextState = itemsReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(1);

        const newItem = nextState.valueSeq().get(0);

        expect(newItem.text).toBe('Mlok');
      });

      it('adds item to existing map', () => {
        let prevState = new OrderedMap();

        prevState = prevState.set('0', new ItemData({
          text: 'Mlok',
        }));
        prevState = prevState.set('1', new ItemData({
          text: 'Block',
        }));

        const action = actionCreators.createItem('Flock');
        const nextState = itemsReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(3);

        const newItem = nextState.valueSeq().get(2);
        const prevItems = nextState.take(2);

        expect(prevItems).toEqual(prevState);

        expect(newItem.text).toBe('Flock');
      });
    });

    describe('"ITEM_DELETED" action', () => {
      it('does nothing without passed state', () => {
        const action = actionCreators.deleteItem('42');
        const nextState = itemsReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(new OrderedMap());
      });

      // region Preparing a state

      let prevState = new OrderedMap();

      prevState = prevState.set('0', new ItemData({
        text: 'Mlok',
      }));
      prevState = prevState.set('1', new ItemData({
        text: 'Block',
      }));
      // endregion

      it('does nothing to state not containing given id', () => {
        const action = actionCreators.deleteItem('42');
        const nextState = itemsReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(prevState);
      });

      it('correctly removes item', () => {
        const action = actionCreators.deleteItem('0');
        const nextState = itemsReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(1);

        const itemThatLived = nextState.valueSeq().get(0);

        expect(itemThatLived).toEqual(nextState.get('1'));
        expect(itemThatLived).toEqual(prevState.get('1'));
      });
    });

    describe('"ITEM_CHANGE_SAVED" action', () => {
      it('does nothing without passed state', () => {
        const action = actionCreators.saveChange('42', 'Glock');
        const nextState = itemsReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(new OrderedMap());
      });

      // region Preparing a state

      let prevState = new OrderedMap();

      prevState = prevState.set('0', new ItemData({
        text: 'Mlok',
      }));
      prevState = prevState.set('1', new ItemData({
        text: 'Block',
      }));
      // endregion

      it('does nothing to state not containing given id', () => {
        const action = actionCreators.saveChange('42', 'Glock');
        const nextState = itemsReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(prevState);
      });

      it('correctly changes ItemData', () => {
        const action = actionCreators.saveChange('0', 'Glock');
        const nextState = itemsReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(2);

        const itemThatWasChanged = nextState.get('0');

        expect(itemThatWasChanged.text).toEqual('Glock');
        expect(nextState.get('1')).toEqual(prevState.get('1'));
      });
    });
  });

  describe('ItemFlagss map reducer', () => {
    describe('"ITEM_CREATED" action', () => {
      it('adds ItemFlags without passed state', () => {
        const action = actionCreators.createItem('Mlok');
        const nextState = itemFlagsMapReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(1);

        const newItemFlags = nextState.valueSeq().get(0);

        expect(newItemFlags.isBeingEdited).toBe(false);
      });

      it('adds ItemFlags to existing map', () => {
        let prevState = new OrderedMap();

        prevState = prevState.set('0', new ItemFlags({
          isBeingEdited: true,
        }));
        prevState = prevState.set('1', new ItemFlags({
          isBeingEdited: false,
        }));

        const action = actionCreators.createItem('Flock');
        const nextState = itemFlagsMapReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(3);

        const newItem = nextState.valueSeq().get(2);
        const prevItems = nextState.take(2);

        expect(prevItems).toEqual(prevState);

        expect(newItem.isBeingEdited).toBe(false);
      });
    });

    describe('"ITEM_DELETED" action', () => {
      it('does nothing without passed state', () => {
        const action = actionCreators.deleteItem('42');
        const nextState = itemFlagsMapReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(new OrderedMap());
      });

      // region Preparing a state

      let prevState = new OrderedMap();

      prevState = prevState.set('0', new ItemFlags({
        isBeingEdited: true,
      }));
      prevState = prevState.set('1', new ItemFlags({
        isBeingEdited: false,
      }));
      // endregion

      it('does nothing to state not containing given id', () => {
        const action = actionCreators.deleteItem('42');
        const nextState = itemFlagsMapReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(prevState);
      });

      it('correctly removes item', () => {
        const action = actionCreators.deleteItem('0');
        const nextState = itemFlagsMapReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(1);

        const infoThatLived = nextState.valueSeq().get(0);

        expect(infoThatLived).toEqual(nextState.get('1'));
        expect(infoThatLived).toEqual(prevState.get('1'));
        expect(infoThatLived.isBeingEdited).toEqual(false);
      });
    });

    describe('"ITEM_CHANGE_SAVED" action', () => {
      it('does nothing without passed state', () => {
        const action = actionCreators.saveChange('42', 'Glock');
        const nextState = itemFlagsMapReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(new OrderedMap());
      });

      // region Preparing a state

      let prevState = new OrderedMap();

      prevState = prevState.set('0', new ItemFlags({
        isBeingEdited: true,
      }));
      prevState = prevState.set('1', new ItemFlags({
        isBeingEdited: false,
      }));
      // endregion

      it('does nothing to state not containing given id', () => {
        const action = actionCreators.saveChange('42', 'Glock');
        const nextState = itemFlagsMapReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(prevState);
      });

      it('makes edited ItemFlags no longer editable', () => {
        const action = actionCreators.saveChange('0', 'Glock');
        const nextState = itemFlagsMapReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(2);

        const itemThatWasChanged = nextState.get('0');

        expect(itemThatWasChanged.isBeingEdited).toEqual(false);
        expect(nextState.get('1')).toEqual(prevState.get('1'));
      });
    });

    describe('"ITEM_MAKE_EDITABLE" action', () => {
      it('does nothing without passed state', () => {
        const action = actionCreators.makeEditable('42');
        const nextState = itemFlagsMapReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(new OrderedMap());
      });

      // region Preparing a state

      let prevState = new OrderedMap();

      prevState = prevState.set('0', new ItemFlags({
        isBeingEdited: true,
      }));
      prevState = prevState.set('1', new ItemFlags({
        isBeingEdited: false,
      }));
      // endregion

      it('does nothing to state not containing given id', () => {
        const action = actionCreators.makeEditable('42');
        const nextState = itemFlagsMapReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(prevState);
      });

      it('does nothing to ItemFlags that is already editable', () => {
        const action = actionCreators.makeEditable('0');
        const nextState = itemFlagsMapReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(2);

        const itemThatWasChanged = nextState.get('0');

        expect(itemThatWasChanged).toEqual(prevState.get('0'));
        expect(nextState.get('1')).toEqual(prevState.get('1'));
      });

      it('makes ItemFlags editable correctly', () => {
        const action = actionCreators.makeEditable('1');
        const nextState = itemFlagsMapReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(2);

        const itemThatWasChanged = nextState.get('1');

        expect(itemThatWasChanged.isBeingEdited).toEqual(true);
        expect(nextState.get('0')).toEqual(prevState.get('0'));
      });
    });

    describe('"ITEM_CHANGE_CANCELLED" action', () => {
      it('does nothing without passed state', () => {
        const action = actionCreators.cancelChange('42');
        const nextState = itemFlagsMapReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(new OrderedMap());
      });

      // region Preparing a state

      let prevState = new OrderedMap();

      prevState = prevState.set('0', new ItemFlags({
        isBeingEdited: true,
      }));
      prevState = prevState.set('1', new ItemFlags({
        isBeingEdited: false,
      }));
      // endregion

      it('does nothing to state not containing given id', () => {
        const action = actionCreators.cancelChange('42');
        const nextState = itemFlagsMapReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(prevState);
      });

      it('does nothing to ItemFlags that is not editable', () => {
        const action = actionCreators.cancelChange('1');
        const nextState = itemFlagsMapReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(2);

        const itemThatWasChanged = nextState.get('1');

        expect(itemThatWasChanged).toEqual(prevState.get('1'));
        expect(nextState.get('0')).toEqual(prevState.get('0'));
      });

      it('makes ItemFlags not-editable correctly', () => {
        const action = actionCreators.cancelChange('0');
        const nextState = itemFlagsMapReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(2);

        const itemThatWasChanged = nextState.get('0');

        expect(itemThatWasChanged.isBeingEdited).toEqual(false);
        expect(nextState.get('1')).toEqual(prevState.get('1'));
      });
    });
  });
});

describe('List reducer', () => {
  it('adds item and ItemFlags correctly', () => {
    const action = actionCreators.createItem('Mlok');
    const nextState = listReducer(undefined, action);

    expect(nextState.items).toBeInstanceOf(OrderedMap);
    expect(nextState.itemFlagsMap).toBeInstanceOf(OrderedMap);
    expect(nextState.items.count()).toBe(1);
    expect(nextState.itemFlagsMap.count()).toBe(1);

    const newItem = nextState.items.valueSeq().get(0);
    const newItemFlags = nextState.itemFlagsMap.valueSeq().get(0);

    expect(newItem.text).toEqual('Mlok');
    expect(newItemFlags.isBeingEdited).toEqual(false);

    expect(nextState.items.keySeq().get(0)).toEqual(nextState.itemFlagsMap.keySeq().get(0));
  });

  // region Preparing a state

  const prevState = {
    items: new OrderedMap(),
    itemFlagsMap: new OrderedMap(),
  };

  prevState.items = prevState.items.set('0', new ItemData({
    text: 'Mlok',
  }));
  prevState.items = prevState.items.set('1', new ItemData({
    text: 'Block',
  }));
  prevState.itemFlagsMap = prevState.itemFlagsMap.set('0', new ItemFlags({
    isBeingEdited: true,
  }));
  prevState.itemFlagsMap = prevState.itemFlagsMap.set('1', new ItemFlags({
    isBeingEdited: false,
  }));

  // endregion

  it('makes an item editable correctly', () => {
    const action = actionCreators.makeEditable('1');
    const nextState = listReducer(prevState, action);

    const changedItemFlags = nextState.itemFlagsMap.get('1');

    expect(changedItemFlags.isBeingEdited).toEqual(true);
    expect(prevState.itemFlagsMap.get('0')).toEqual(nextState.itemFlagsMap.get('0'));
    expect(prevState.items.get('0')).toEqual(nextState.items.get('0'));
  });

  it('cancels changes correctly', () => {
    const action = actionCreators.cancelChange('0');
    const nextState = listReducer(prevState, action);

    const changedItemFlags = nextState.itemFlagsMap.get('0');

    expect(changedItemFlags.isBeingEdited).toEqual(false);
    expect(prevState.itemFlagsMap.get('1')).toEqual(nextState.itemFlagsMap.get('1'));
    expect(prevState.items.get('1')).toEqual(nextState.items.get('1'));
  });

  it('saves changed item correctly', () => {
    const action = actionCreators.saveChange('0', 'Slock');
    const nextState = listReducer(prevState, action);

    const changedItem = nextState.items.get('0');
    const changedItemFlags = nextState.itemFlagsMap.get('0');

    expect(changedItem.text).toEqual('Slock');
    expect(changedItemFlags.isBeingEdited).toEqual(false);

    expect(prevState.itemFlagsMap.get('1')).toEqual(nextState.itemFlagsMap.get('1'));
    expect(prevState.items.get('1')).toEqual(nextState.items.get('1'));
  });
});
