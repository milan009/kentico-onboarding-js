import * as React from 'react';
import { IItemViewModel } from '../interfaces/IItemViewModel';
import { IAction } from '../interfaces/IAction';

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
  item: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    isEdited: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,
  }).isRequired,
  onDoubleClick: React.PropTypes.func.isRequired,
};

export { ItemRead };
