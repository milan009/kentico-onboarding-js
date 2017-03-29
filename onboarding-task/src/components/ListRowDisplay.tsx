import * as React from 'react';
import { IItemViewModel } from '../interfaces/IItemViewModel';

const {PropTypes} = React;

interface IListRowDisplayProps {
  item: IItemViewModel;
  onItemClick: () => void;
}

const ListRowDisplay: React.StatelessComponent<IListRowDisplayProps> = (props) => {
  return (
    <div className="item-active" onClick={props.onItemClick}>
      {props.item.index}. <span>{props.item.text}</span>
    </div>
  );
};

ListRowDisplay.displayName = 'ListRowDisplay';

ListRowDisplay.propTypes = {
  item: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export { ListRowDisplay };
