import React = require('react');

import { IAction } from '../interfaces/IAction';

type onClickType = () => IAction;

const ListItemLabel = ({ text, index, onClick }: { text: string; index: number; onClick: onClickType }) =>
  <div onClick={onClick}>{index}. {text}</div>;

export { ListItemLabel };
