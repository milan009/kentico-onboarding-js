import * as React from 'react';
import { IAction } from '../actions/IAction';

interface IItemDetailProps {
  startEditingItem: () => IAction;
  index: number;
  text: string;
}

const ItemDetail: React.StatelessComponent<IItemDetailProps> = ({ startEditingItem, index, text }) => (
  <div onClick={startEditingItem}>{`${index}. ${text}`}</div>
);

ItemDetail.displayName = 'ItemDetail';

export { ItemDetail };
