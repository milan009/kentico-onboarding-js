import { Record } from 'immutable';

interface IItemUiPropsRecord {
  formDisplayed: boolean;
}

interface IItemUiPropsDefaultValues {
  formDisplayed?: boolean;
}

const itemUiPropsDefaultValues: IItemUiPropsDefaultValues = {
  formDisplayed: false,
};

class ItemUiPropsRecord extends Record(itemUiPropsDefaultValues) implements IItemUiPropsRecord {
  formDisplayed: boolean;
}

export { ItemUiPropsRecord };
