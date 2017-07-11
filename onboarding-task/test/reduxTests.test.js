import * as ActionCreators from '../src/actions/actionCreators';
import * as ActionTypes from '../src/actions/actionTypes';
import * as Reducers from '../src/reducers/reducersExport';
import { ItemData } from '../src/models/ItemData';
import { ItemInfo } from '../src/models/ItemInfo';
import { OrderedMap } from 'immutable';

describe('Action creators', () => {
  it('creates "ITEM_CREATED" action correctly', () => {
    const addItemAction = ActionCreators.createItem('New Item');
    expect(addItemAction.type).toBe(ActionTypes.ITEM_CREATED);
    expect(addItemAction.payload).toBeDefined();
    expect(addItemAction.payload.newId).toBeDefined();
    expect(addItemAction.payload.text).toBe('New Item');
  });

  it('creates "ITEM_DELETED" action correctly', () => {
    const deleteItemAction = ActionCreators.deleteItem(17);
    expect(deleteItemAction.type).toBe(ActionTypes.ITEM_DELETED);
    expect(deleteItemAction.payload).toBeDefined();
    expect(deleteItemAction.payload.id).toBe(17);
    expect(deleteItemAction.payload.text).toBeUndefined();
  });

  it('creates "ITEM_CHANGE_CANCELLED" action correctly', () => {
    const itemCancelChangeAction = ActionCreators.cancelChange(21);
    expect(itemCancelChangeAction.type).toBe(ActionTypes.ITEM_CHANGE_CANCELLED);
    expect(itemCancelChangeAction.payload).toBeDefined();
    expect(itemCancelChangeAction.payload.id).toBe(21);
    expect(itemCancelChangeAction.payload.text).toBeUndefined();
  });

  it('creates "ITEM_CHANGE_SAVED" action correctly', () => {
    const itemSaveChangeAction = ActionCreators.saveChange(42, 'Edited Text');
    expect(itemSaveChangeAction.type).toBe(ActionTypes.ITEM_CHANGE_SAVED);
    expect(itemSaveChangeAction.payload).toBeDefined();
    expect(itemSaveChangeAction.payload.id).toBe(42);
    expect(itemSaveChangeAction.payload.text).toBe('Edited Text');
  });

  it('creates "ITEM_MAKE_EDITABLE" action correctly', () => {
    const makeEditableItemAction = ActionCreators.makeEditable(25);
    expect(makeEditableItemAction.type).toBe(ActionTypes.ITEM_MAKE_EDITABLE);
    expect(makeEditableItemAction.payload).toBeDefined();
    expect(makeEditableItemAction.payload.id).toBe(25);
    expect(makeEditableItemAction.payload.text).toBeUndefined();
  });
});

describe('Single object reducers', () => {
  describe('ItemInfo reducer', () => {
    describe('"ITEM_MAKE_EDITABLE" action', () => {
      it('makes ItemInfo edited correctly', () => {
        const prevState = new ItemInfo(
          {
            isEdited: false,
          }
        );

        const action = ActionCreators.makeEditable('42');
        const nextState = Reducers.itemInfoReducer(prevState, action);

        expect(nextState.isEdited).toBe(true);
        expect(prevState.isEdited).toBe(false);
      });

      it('does not change already edited ItemInfo', () => {
        const prevState = new ItemInfo(
          {
            isEdited: true,
          }
        );

        const action = ActionCreators.makeEditable('42');
        const nextState = Reducers.itemInfoReducer(prevState, action);

        expect(nextState).toEqual(prevState);
      });
    });

    describe('"ITEM_CHANGE_CANCELLED" action', () => {
      it('does not change ItemInfo that is not being edited', () => {
        const prevState = new ItemInfo(
          {
            isEdited: false,
          }
        );

        const action = ActionCreators.cancelChange('42');
        const nextState = Reducers.itemInfoReducer(prevState, action);

        expect(nextState).toEqual(prevState);
      });

      it('makes edited ItemInfo not editable anymore', () => {
        const prevState = new ItemInfo(
          {
            isEdited: true,
          }
        );

        const action = ActionCreators.cancelChange('42');
        const nextState = Reducers.itemInfoReducer(prevState, action);

        expect(nextState.id).toBe(prevState.id);
        expect(nextState.text).toBe(prevState.text);
        expect(nextState.isEdited).toBe(false);
        expect(prevState.isEdited).toBe(true);
      });
    });

    describe('"ITEM_CHANGE_SAVED" action', () => {
      it('does not change ItemInfo that is not being edited', () => {
        const prevState = new ItemInfo(
          {
            isEdited: false,
          }
        );

        const action = ActionCreators.cancelChange('42');
        const nextState = Reducers.itemInfoReducer(prevState, action);

        expect(nextState).toEqual(prevState);
      });

      it('makes edited ItemInfo not editable anymore', () => {
        const prevState = new ItemInfo(
          {
            isEdited: true,
          }
        );

        const action = ActionCreators.cancelChange('42');
        const nextState = Reducers.itemInfoReducer(prevState, action);

        expect(nextState.id).toBe(prevState.id);
        expect(nextState.text).toBe(prevState.text);
        expect(nextState.isEdited).toBe(false);
        expect(prevState.isEdited).toBe(true);
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

        const action = ActionCreators.saveChange(42, 'Glock');
        const nextState = Reducers.itemReducer(prevState, action);

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
        const action = ActionCreators.createItem('Mlok');
        const nextState = Reducers.itemsReducer(undefined, action);

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

        const action = ActionCreators.createItem('Flock');
        const nextState = Reducers.itemsReducer(prevState, action);

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
        const action = ActionCreators.deleteItem('42');
        const nextState = Reducers.itemsReducer(undefined, action);

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
        const action = ActionCreators.deleteItem('42');
        const nextState = Reducers.itemsReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(prevState);
      });

      it('correctly removes item', () => {
        const action = ActionCreators.deleteItem('0');
        const nextState = Reducers.itemsReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(1);

        const itemThatLived = nextState.valueSeq().get(0);

        expect(itemThatLived).toEqual(nextState.get('1'));
        expect(itemThatLived).toEqual(prevState.get('1'));
      });
    });

    describe('"ITEM_CHANGE_SAVED" action', () => {
      it('does nothing without passed state', () => {
        const action = ActionCreators.saveChange('42', 'Glock');
        const nextState = Reducers.itemsReducer(undefined, action);

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
        const action = ActionCreators.saveChange('42', 'Glock');
        const nextState = Reducers.itemsReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(prevState);
      });

      it('correctly changes ItemData', () => {
        const action = ActionCreators.saveChange('0', 'Glock');
        const nextState = Reducers.itemsReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(2);

        const itemThatWasChanged = nextState.get('0');

        expect(itemThatWasChanged.text).toEqual('Glock');
        expect(nextState.get('1')).toEqual(prevState.get('1'));
      });
    });
  });

  describe('ItemInfos map reducer', () => {
    describe('"ITEM_CREATED" action', () => {
      it('adds ItemInfo without passed state', () => {
        const action = ActionCreators.createItem('Mlok');
        const nextState = Reducers.itemInfosReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(1);

        const newItemInfo = nextState.valueSeq().get(0);

        expect(newItemInfo.isEdited).toBe(false);
      });

      it('adds ItemInfo to existing map', () => {
        let prevState = new OrderedMap();

        prevState = prevState.set('0', new ItemInfo({
          isEdited: true,
        }));
        prevState = prevState.set('1', new ItemInfo({
          isEdited: false,
        }));

        const action = ActionCreators.createItem('Flock');
        const nextState = Reducers.itemInfosReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(3);

        const newItem = nextState.valueSeq().get(2);
        const prevItems = nextState.take(2);

        expect(prevItems).toEqual(prevState);

        expect(newItem.isEdited).toBe(false);
      });
    });

    describe('"ITEM_DELETED" action', () => {
      it('does nothing without passed state', () => {
        const action = ActionCreators.deleteItem('42');
        const nextState = Reducers.itemInfosReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(new OrderedMap());
      });

      // region Preparing a state

      let prevState = new OrderedMap();

      prevState = prevState.set('0', new ItemInfo({
        isEdited: true,
      }));
      prevState = prevState.set('1', new ItemInfo({
        isEdited: false,
      }));
      // endregion

      it('does nothing to state not containing given id', () => {
        const action = ActionCreators.deleteItem('42');
        const nextState = Reducers.itemInfosReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(prevState);
      });

      it('correctly removes item', () => {
        const action = ActionCreators.deleteItem('0');
        const nextState = Reducers.itemInfosReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(1);

        const infoThatLived = nextState.valueSeq().get(0);

        expect(infoThatLived).toEqual(nextState.get('1'));
        expect(infoThatLived).toEqual(prevState.get('1'));
        expect(infoThatLived.isEdited).toEqual(false);
      });
    });

    describe('"ITEM_CHANGE_SAVED" action', () => {
      it('does nothing without passed state', () => {
        const action = ActionCreators.saveChange('42', 'Glock');
        const nextState = Reducers.itemInfosReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(new OrderedMap());
      });

      // region Preparing a state

      let prevState = new OrderedMap();

      prevState = prevState.set('0', new ItemInfo({
        isEdited: true,
      }));
      prevState = prevState.set('1', new ItemInfo({
        isEdited: false,
      }));
      // endregion

      it('does nothing to state not containing given id', () => {
        const action = ActionCreators.saveChange('42', 'Glock');
        const nextState = Reducers.itemInfosReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(prevState);
      });

      it('makes edited ItemInfo no longer editable', () => {
        const action = ActionCreators.saveChange('0', 'Glock');
        const nextState = Reducers.itemInfosReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(2);

        const itemThatWasChanged = nextState.get('0');

        expect(itemThatWasChanged.isEdited).toEqual(false);
        expect(nextState.get('1')).toEqual(prevState.get('1'));
      });
    });

    describe('"ITEM_MAKE_EDITABLE" action', () => {
      it('does nothing without passed state', () => {
        const action = ActionCreators.makeEditable('42');
        const nextState = Reducers.itemInfosReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(new OrderedMap());
      });

      // region Preparing a state

      let prevState = new OrderedMap();

      prevState = prevState.set('0', new ItemInfo({
        isEdited: true,
      }));
      prevState = prevState.set('1', new ItemInfo({
        isEdited: false,
      }));
      // endregion

      it('does nothing to state not containing given id', () => {
        const action = ActionCreators.makeEditable('42');
        const nextState = Reducers.itemInfosReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(prevState);
      });

      it('does nothing to ItemInfo that is already editable', () => {
        const action = ActionCreators.makeEditable('0');
        const nextState = Reducers.itemInfosReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(2);

        const itemThatWasChanged = nextState.get('0');

        expect(itemThatWasChanged).toEqual(prevState.get('0'));
        expect(nextState.get('1')).toEqual(prevState.get('1'));
      });

      it('makes ItemInfo editable correctly', () => {
        const action = ActionCreators.makeEditable('1');
        const nextState = Reducers.itemInfosReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(2);

        const itemThatWasChanged = nextState.get('1');

        expect(itemThatWasChanged.isEdited).toEqual(true);
        expect(nextState.get('0')).toEqual(prevState.get('0'));
      });
    });

    describe('"ITEM_CHANGE_CANCELLED" action', () => {
      it('does nothing without passed state', () => {
        const action = ActionCreators.cancelChange('42');
        const nextState = Reducers.itemInfosReducer(undefined, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(new OrderedMap());
      });

      // region Preparing a state

      let prevState = new OrderedMap();

      prevState = prevState.set('0', new ItemInfo({
        isEdited: true,
      }));
      prevState = prevState.set('1', new ItemInfo({
        isEdited: false,
      }));
      // endregion

      it('does nothing to state not containing given id', () => {
        const action = ActionCreators.cancelChange('42');
        const nextState = Reducers.itemInfosReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState).toEqual(prevState);
      });

      it('does nothing to ItemInfo that is not editable', () => {
        const action = ActionCreators.cancelChange('1');
        const nextState = Reducers.itemInfosReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(2);

        const itemThatWasChanged = nextState.get('1');

        expect(itemThatWasChanged).toEqual(prevState.get('1'));
        expect(nextState.get('0')).toEqual(prevState.get('0'));
      });

      it('makes ItemInfo not-editable correctly', () => {
        const action = ActionCreators.cancelChange('0');
        const nextState = Reducers.itemInfosReducer(prevState, action);

        expect(nextState).toBeInstanceOf(OrderedMap);
        expect(nextState.count()).toBe(2);

        const itemThatWasChanged = nextState.get('0');

        expect(itemThatWasChanged.isEdited).toEqual(false);
        expect(nextState.get('1')).toEqual(prevState.get('1'));
      });
    });
  });
});

describe('List reducer', () => {
  it('adds item and ItemInfo correctly', () => {
    const action = ActionCreators.createItem('Mlok');
    const nextState = Reducers.listReducer(undefined, action);

    expect(nextState.items).toBeInstanceOf(OrderedMap);
    expect(nextState.itemInfos).toBeInstanceOf(OrderedMap);
    expect(nextState.items.count()).toBe(1);
    expect(nextState.itemInfos.count()).toBe(1);

    const newItem = nextState.items.valueSeq().get(0);
    const newItemInfo = nextState.itemInfos.valueSeq().get(0);

    expect(newItem.text).toEqual('Mlok');
    expect(newItemInfo.isEdited).toEqual(false);

    expect(nextState.items.keySeq().get(0)).toEqual(nextState.itemInfos.keySeq().get(0));
  });

  // region Preparing a state

  const prevState = {
    items: new OrderedMap(),
    itemInfos: new OrderedMap(),
  };

  prevState.items = prevState.items.set('0', new ItemData({
    text: 'Mlok',
  }));
  prevState.items = prevState.items.set('1', new ItemData({
    text: 'Block',
  }));
  prevState.itemInfos = prevState.itemInfos.set('0', new ItemInfo({
    isEdited: true,
  }));
  prevState.itemInfos = prevState.itemInfos.set('1', new ItemInfo({
    isEdited: false,
  }));

  // endregion

  it('makes an item editable correctly', () => {
    const action = ActionCreators.makeEditable('1');
    const nextState = Reducers.listReducer(prevState, action);

    const changedItemInfo = nextState.itemInfos.get('1');

    expect(changedItemInfo.isEdited).toEqual(true);
    expect(prevState.itemInfos.get('0')).toEqual(nextState.itemInfos.get('0'));
    expect(prevState.items.get('0')).toEqual(nextState.items.get('0'));
  });

  it('cancels changes correctly', () => {
    const action = ActionCreators.cancelChange('0');
    const nextState = Reducers.listReducer(prevState, action);

    const changedItemInfo = nextState.itemInfos.get('0');

    expect(changedItemInfo.isEdited).toEqual(false);
    expect(prevState.itemInfos.get('1')).toEqual(nextState.itemInfos.get('1'));
    expect(prevState.items.get('1')).toEqual(nextState.items.get('1'));
  });

  it('saves changed item correctly', () => {
    const action = ActionCreators.saveChange('0', 'Slock');
    const nextState = Reducers.listReducer(prevState, action);

    const changedItem = nextState.items.get('0');
    const changedItemInfo = nextState.itemInfos.get('0');

    expect(changedItem.text).toEqual('Slock');
    expect(changedItemInfo.isEdited).toEqual(false);

    expect(prevState.itemInfos.get('1')).toEqual(nextState.itemInfos.get('1'));
    expect(prevState.items.get('1')).toEqual(nextState.items.get('1'));
  });
});
