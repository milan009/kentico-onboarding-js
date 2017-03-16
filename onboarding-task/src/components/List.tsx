import React = require('react');
import { List as ImmutableList } from 'immutable';

import { ListItemContainer } from '../containers/ListItemContainer';
import { CreateListItem } from './CreateListItem';
import { IAction } from '../interfaces/IAction';

interface IListProps {
  itemsOrder: ImmutableList<string>;
  isFetching: boolean;
  onListItemAdd: (text: string) => IAction;
  onListMount: () => IAction;
}

class List extends React.PureComponent<IListProps, undefined> {

  static displayName = 'List';

  componentWillMount() {
    this.props.onListMount();
  }

  render() {
    if (this.props.isFetching) {
      return (
        <div className="angryLoaderMain">
          <div className="load">Loading...</div>
          <div className="hands"></div>
          <div className="body"></div>
          <div className="head">
            <div className="eye"></div>
          </div>
        </div>
      );
    } else {
      const listItems = this.props.itemsOrder.map((key) =>
        <li key={key} className="list-group-item">
          <ListItemContainer
            id={key as string}
          />
        </li>
      );

      return (
        <ul className="list-group">
          {listItems}
          <li key="CreateListItemKey" className="list-group-item">
            <CreateListItem onListItemAdd={this.props.onListItemAdd}/>
          </li>
        </ul>
      );
    }
  }
}

export { List };
