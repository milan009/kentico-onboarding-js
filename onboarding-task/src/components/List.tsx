import React = require('react');
import { List as ImmutableList } from 'immutable';

import { ListItemContainer } from '../containers/ListItemContainer';
import { CreateListItem } from './CreateListItem';
import { IAction } from '../interfaces/IAction';
import { StatusMessage } from './utilComponents/StatusMessage';

interface IListProps {
  readonly itemsOrder: ImmutableList<string>;
  readonly error: string;
  readonly successMessage: string;
  readonly onListItemAdd: (text: string) => Promise<IAction>;
}

class List extends React.PureComponent<IListProps, undefined> {

  static displayName = 'List';


  render() {
      const listItems = this.props.itemsOrder.map((key) =>
        <li key={key} className="list-group-item">
          <ListItemContainer
            id={key as string}
          />
        </li>
      );

      return (
        <div>
          <StatusMessage message={this.props.error} messageType={'Error'} />
          <StatusMessage message={this.props.successMessage} messageType={'Success'} />
          <ul className="list-group">

            {listItems}
            <li key="CreateListItemKey" className="list-group-item">
              <CreateListItem onListItemAdd={this.props.onListItemAdd}/>
            </li>
          </ul>
        </div>
      );
    }
}

export { List };
