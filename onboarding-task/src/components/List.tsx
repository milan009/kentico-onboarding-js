import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import {OrderedMap} from 'immutable';

import { Item } from '../containers/Item';
import { AddForm } from './AddForm';
import { IViewItem } from '../viewModels/ViewItem';

interface IListProps {
  list: OrderedMap<string, IViewItem>;
  addItem: (text: string) => void;
}

class List extends React.PureComponent<IListProps, undefined> {
  static displayName = 'List';

  static propTypes = {
    list: ImmutablePropTypes.orderedMapOf(ImmutablePropTypes.record).isRequired,
    addItem: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {this.props.list.valueSeq().map((item: IViewItem, index: number) =>
              <Item item={item} index={index} key={item.id}/>)
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
