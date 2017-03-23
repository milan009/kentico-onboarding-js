import {
  ITEM_DELETE,
  ITEM_UPDATE,
  ITEM_CREATE,
  ITEM_TOGGLE_EDIT,
} from '../../src/actions/actionTypes.js';
import {
  createItem,
  updateItem,
  deleteItem,
  toggleEditItem,
} from '../../src/actions/actionCreators.js';
import { createItemFactory } from '../../src/actions/itemCreateFactory.js';

describe('actionCreators:', () => {
  const id = 'TestId';
  const text = 'TestText';

  it(`createItem returns action ${ITEM_CREATE}`, () => {
    const expected = {
      type: ITEM_CREATE,
      payload: {
        id,
        text,
      },
    };
    const result = createItem(text);

    expect(result.type).toBe(expected.type);
    expect(result.payload.text).toBe(expected.payload.text);
  });

  it(`createItemFactory returns action ${ITEM_CREATE} and generate id using idGenerator`, () => {
    const expected = {
      type: ITEM_CREATE,
      payload: {
        id,
        text,
      },
    };
    const result = createItemFactory(() => id)(text);

    expect(result).toEqual(expected);
  });

  it(`updateItem returns action ${ITEM_UPDATE}`, () => {
    const expected = {
      type: ITEM_UPDATE,
      payload: {
        id,
        text,
      },
    };
    const result = updateItem(id, text);

    expect(result).toEqual(expected);
  });

  it(`deleteItem returns action ${ITEM_DELETE}`, () => {
    const expected = {
      type: ITEM_DELETE,
      payload: {
        id,
      },
    };
    const result = deleteItem(id);

    expect(result).toEqual(expected);
  });

  it(`toggleEditItem returns action ${ITEM_TOGGLE_EDIT}`, () => {
    const expected = {
      type: ITEM_TOGGLE_EDIT,
      payload: {
        id,
      },
    };
    const result = toggleEditItem(id);

    expect(result).toEqual(expected);
  });
});
