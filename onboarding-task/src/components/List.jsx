import React, { Component, PropTypes } from 'react';
import { ListItem } from '../containers/ListItem';

import { AddItem } from './AddItem.tsx';
import ImmutablePropTypes from 'react-immutable-proptypes';

class List extends Component {
  static displayName = 'List';
  static propTypes = {
    itemsOrder: ImmutablePropTypes.list.isRequired,
    onAddItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this._addItem = this._addItem.bind(this);
  }

  _addItem(text) {
    this.props.onAddItem(text);
  }

  render() {
    const items = this.props.itemsOrder;
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
