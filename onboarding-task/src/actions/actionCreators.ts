const ITEM_CREATED = (value: string) => {
  return { type: ITEM_CREATED, value }
};

const ITEM_DELETED = (id: string) => {
  return { type: ITEM_DELETED, id }
};

const ITEM_EDITED = (id: string, newValue: string) => {
  return { type: ITEM_EDITED, id, newValue }
};

const ITEM_EDIT_MODE_TOGGLE = (id: string, newValue: string) => {
  return { type: ITEM_EDIT_MODE_TOGGLE, id, newValue }
};

export { ITEM_CREATED, ITEM_DELETED, ITEM_EDITED, ITEM_EDIT_MODE_TOGGLE };
