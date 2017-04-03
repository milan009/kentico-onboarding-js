import * as React from 'react';
import { IItemViewModel } from '../models/IItemViewModel';

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
  item: React.PropTypes.object.isRequired,
  onItemClick: React.PropTypes.func.isRequired,
};

export { ListRowDisplay };
