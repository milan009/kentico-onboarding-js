import { Record } from 'immutable';

interface IItemUiPropsRecord {
  formDisplayed: boolean;
  savedOnServer: boolean;
}

interface IItemUiPropsDefaultValues {
  formDisplayed?: boolean;
  savedOnServer?: boolean;
}

const itemUiPropsDefaultValues: IItemUiPropsDefaultValues = {
  formDisplayed: false,
  savedOnServer: false,
};

class ItemUiPropsRecord extends Record(itemUiPropsDefaultValues) implements IItemUiPropsRecord {
  formDisplayed: boolean;
  savedOnServer: boolean;
}

export { ItemUiPropsRecord };
