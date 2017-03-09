import React = require('react');

import { IAction } from '../interfaces/IAction';

interface ListItemLabelProps {
  text: string;
  index: number;
  onClick: () => IAction;
}

const ListItemLabel = ({ text, index, onClick }: ListItemLabelProps) =>
  <div onClick={onClick}>{index}. {text}</div>;

export { ListItemLabel };
