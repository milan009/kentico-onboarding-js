import { Record } from 'immutable';

interface IItemRecord {
  id?: string;
  text?: string;
  formDisplayed: boolean;
}

const defaultValues: IItemRecord = {
  id: undefined,
  text: undefined,
  formDisplayed: false,
};

class ItemRecord extends Record(defaultValues) implements IItemRecord {
  id: string;
  text: string;
  formDisplayed: boolean;
}

export { ItemRecord };
