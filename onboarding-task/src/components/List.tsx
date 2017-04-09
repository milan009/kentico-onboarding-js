import * as React from 'react';
import * as Immutable from 'immutable';

import { ListItem } from '../containers/ListItemContainer';
import { AddItem } from './AddItem';

interface IListDataProps {
  itemsOrder: Immutable.OrderedSet<string>;
}

interface IListCallbacksProps {
  onAddItem: (value: string) => void,
}

class List extends React.PureComponent<IListDataProps & IListCallbacksProps, undefined> {
  static displayName = 'List';

  static propTypes = {
    itemsOrder: React.PropTypes.instanceOf(Immutable.OrderedSet).isRequired,
    onAddItem: React.PropTypes.func.isRequired,
  };

  constructor(props: IListDataProps & IListCallbacksProps) {
    super(props);
  }

  _renderListItems = () => {
    return this.props.itemsOrder.toIndexedSeq().map((id: string) =>
      <li className="list-group-item" key={id}>
        <ListItem id={id} />
      </li>
    );
  };

  render() {
    return (
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ul className="list-group">
          {this._renderListItems()}
          <li className="list-group-item">
            <AddItem onAdd={this.props.onAddItem} />
          </li>
        </ul>
      </div>
    );
  }
}

export { List, IListDataProps, IListCallbacksProps };
