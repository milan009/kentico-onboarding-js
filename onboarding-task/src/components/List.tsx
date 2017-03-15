import * as React from 'react';
import { PropTypes } from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import { ListItem } from '../containers/ListItem';
import { AddItem } from './AddItem';
import {Set} from 'immutable';
import {IItemAction} from '../actions/IItemAction';

interface IListProps {
  itemsOrder: Set<string>;
  onAddItem: (text: string) => IItemAction;
}

class List extends React.PureComponent<IListProps, undefined> {
  static displayName = 'List';
  static propTypes = {
    itemsOrder: ImmutablePropTypes.orderedSet.isRequired,
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props: IListProps) {
    super(props);

    this._addItem = this._addItem.bind(this);
  }

  _addItem(text: string) {
    this.props.onAddItem(text);
  }

  render() {
    const items = this.props.itemsOrder.valueSeq();
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <table className="table table-bordered">
            <tbody>
              {items.map((guid, index) =>
                <ListItem guid={guid} key={guid} index={index + 1} />
              )}
              <AddItem onItemAdd={this._addItem} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export { List };
