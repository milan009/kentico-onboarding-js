///<reference path="../../node_modules/@types/react/index.d.ts"/>
import * as React from 'react';
const PropTypes = require('prop-types');
import { IItemViewModel } from '../models/IItemViewModel';
import { IAction } from '../actionCreators/IAction';

interface IItemReadDataProps {
  item: IItemViewModel;
}

interface IItemReadCallbackProps {
  onDoubleClick: () => IAction;
}

const ItemRead: React.StatelessComponent<IItemReadDataProps & IItemReadCallbackProps> = (props) => (
  <div onDoubleClick={props.onDoubleClick} >
    <span>{props.item.index}. </span>
    {props.item.text}
  </div>
  );

ItemRead.displayName = 'ItemRead';
ItemRead.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isEdited: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export { ItemRead };
