import { Record } from 'immutable';

interface IItemUiPropsRecord {
  readonly formDisplayed: boolean;
  readonly savedOnServer: boolean;
}

interface IItemUiPropsDefaultValues {
  readonly formDisplayed?: boolean;
  readonly savedOnServer?: boolean;
}

const itemUiPropsDefaultValues: IItemUiPropsDefaultValues = {
  formDisplayed: false,
  savedOnServer: false,
};

class ItemUiPropsRecord extends Record(itemUiPropsDefaultValues) implements IItemUiPropsRecord {
  readonly formDisplayed: boolean;
  readonly savedOnServer: boolean;
}

export { ItemUiPropsRecord };
