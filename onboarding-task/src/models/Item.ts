import { Record } from 'immutable';

interface IItem {
  readonly id: string;
  readonly text: string;
}

interface IItemProps {
  readonly id?: string;
  readonly text?: string;
}

const defaultValues: IItem = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
};

class Item extends Record(defaultValues) implements IItem {
  readonly id: string;
  readonly text: string;

  constructor(props: IItemProps) {
    super(props);
  }
}

export { Item, IItem };

