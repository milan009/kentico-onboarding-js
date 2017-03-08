import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import { OrderedSet } from 'immutable';

import { Item } from '../containers/Item';
import { AddForm } from './AddForm';

interface IListProps {
  list: OrderedSet<string>;
  addItem: (text: string) => void;
}

class List extends React.PureComponent<IListProps, undefined> {
  static displayName = 'List';

  static propTypes = {
    list: ImmutablePropTypes.orderedSet.isRequired,
    addItem: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {this.props.list.valueSeq().map((id: string, index: number) =>
              <Item index={index} id={id} key={id} />)
            }
            <li className="list-group-item">
              <AddForm onAdd={this.props.addItem} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export { List };
